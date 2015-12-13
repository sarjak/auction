var express = require('express');
var router = express.Router();
var userSchema = require('../models/user');
var nodemailer = require('nodemailer');


// For File uploading

var multer  = require('multer');
var crypto = require('crypto');
var mime = require('mime');


var storage = multer.diskStorage({
  destination: './uploads/profile_pictures', 
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
    });
  }
});

var upload = multer({ storage: storage });

/*
// For Email

var smtpTransport = require('nodemailer-smtp-transport');
var transporter = nodemailer.createTransport({
    service: 'Yahoo',
    auth: {
        user: 'startauction@yahoo.com',
        pass: '9157574040'
    }
});
*/
/*
var smtpTransport = require('nodemailer-smtp-transport');
var transporter = nodemailer.createTransport(smtpTransport({
	port: 25,
	host: "webmail.daiict.ac.in",
	auth : {user : "201412003@daiict.ac.in", pass: "dream2468"},
	secureConnection: true
}));
*/

/* GET users listing. */
//router.get('/', function(req, res, next) {
//	res.send('respond with a resource');
//});


// Controller: List all Users
// URL: http://www.domain.com/users/
// Method: GET
// Paramaters: No parameters
// Returns: Object containing list of all the users in the database

router.get('/',function(req,res,next){
	userSchema.find({}, function(err, user){
		if(err){
			console.log(err);
			res.json(err);
		}
		else{
			res.json(user);
		}
	});
});

// Controller: Reset password
// URL: http://www.domain.com/users/sendpassword/<email>
// Method: GET
// Paramaters: email
// Returns: send mail to user containing password.

router.get('/sendpassword/:email',function(req,res,next){
	var response_object;
	userSchema.findOne({ 'email' : req.params.email }, function(err, user){
		if(err){
			console.log(err);
			res.json(err);
		}
		else{
			console.log(user.fname);
			console.log(user.email);
			var mailOptions = {
			  from: 'startauction@yahoo.com', // sender address
			  to: user.email, // list of receivers
			  bcc: 'gandhi.sarjak@gmail.com',
			  subject: 'Password reset Bidbucks !', // Subject line
			  html: '<b>Hello '+user.fname+' '+user.lname+',</b><br/><p> Your Password is : '+user.password+'</p>' // html body
			};		
			console.log("Started sending mail");
			console.log(user.fname);
			console.log(user.email);
			transporter.sendMail(mailOptions, function(error, info){
				console.log("Send Mail completed");
				if(error){
				    console.log(error);
				   	res.json(err);
				} else {
					res.json(user);
				}
				console.log('Message sent: ' + info);
			});
			
		}
	});
});
// Controller: Return Specific user
// Description: It retrieves user based on the given userid
// URL: http://www.domain.com/users/:userid
// Mehod: GET
// Parameters: No parameters
// Returns: User object if found in the database, else error.

router.get('/:userid', function(req,res,next){
	
	userSchema.find({ _id : req.params.userid }, function(err, user){
		if(err){
			console.log(err);
			res.json(err);
		}
		else{
			res.json(user);
		}
	});
});

// Controller: login
// Description: Authenticate the user
// URL: http://www.domain.com/users/login
// Mehod: POST
// Parameters: username, password
// Returs: User object if correct credentials are given, status and message otherwise

router.post('/login',function(req, res, next) {
	
	var response_object;
	// Check parameters
	if(!(req.body.username && req.body.password || req.body.email && req.body.password)) {
		response_object = { status: 1, message: "Invalid arguments" };
		res.json(response_object);
		return;
	}

	// Get the parameters for request body
	var username = req.body.username;
	var password = req.body.password;
	var email = req.body.email;
	// Find User with username
	userSchema.findOne({ $or : [{'username' : username} , {'user_emailid':email}]}, function(err,user){
		if(err) {
			console.log(err);
			response_object = { status: 2, message: "Something went wrong" };
			// Send JSON response to caller
			res.json(response_object);
		}	
		else {
			if(user) {
				if(user.user_pwd == password) {
					if(user.activated) {
						response_object = user;
						console.log(user);
						res.json(response_object);
					} else {
						response_object = {status: 3, message: "User is not active"};
						res.json(response_object);
					}	
				} else {
					response_object = {status: 4,message: "Password is incorrect"};
					res.json(response_object);
				}
				
			}
			else {
				response_object = { status: 3, message: "Username does not exist"};
				res.json(response_object);
			}
		}

	});
});

// Controller: register
// Description: Authenticate the user
// URL: http://www.domain.com/users/register
// Mehod: POST
// Parameters: user registration details
// Returs: status and message

router.post('/register',  upload.single('profile_pic'), function(req,res,next) {
	
	var response_object;
	console.log('check register');
	// Create new user Object
	var parameters = req.body;

	console.log('parameters ' + parameters.username );
	var user = new userSchema(parameters);

	if(req.file) {
		user.profile_picture = req.file.path;
	}

	// Checks 
	console.log(user.username);
	var err = user.validateSync(); 
	if(err) {
		res.json(err);
	} else {
		user.save(function(err, user, numAffected) {
			if(err) {
				console.log(err);
				res.json(err);
			} else 
			{
				res.json(user);
		/*		var mailOptions = {
				  from: 'startauction@yahoo.com', // sender address
				  to: user.email, // list of receivers
				  bcc: 'gandhi.sarjak@gmail.com',
				  subject: 'Welcome to Bidbucks !', // Subject line
				  html: '<b>Hello '+user.fname+' '+user.lname+',</b><br/><p>Thank You for registering at www.bidbucks.com. To activate your account please click on the below link: <br/> <a href="http://sentest.herokuapp.com/users/activate/'+user._id+'">Activate</a> </p>' // html body
				};		
				console.log("Started sending mail");
				
				transporter.sendMail(mailOptions, function(error, info){
					console.log("Send Mail completed");
					if(error){
					    console.log(error);
					   	res.json(err);
					} else {
						res.json(user);
					}
					console.log('Message sent: ' + info);
				});	// res.send(info);
			
			*/
		}
		});	
	}
});

// Controller: activate
// Description: Activates the user
// URL: http://www.domain.com/users/activate/:userid
// Method: GET
// Parameters: user _id
// Returs: status and message

router.get('/activate/:userid',function(req,res,next) {
	// TODO: activate user with given _id

	var query = userSchema.where({ _id: req.params.userid})

	query.findOne(function (err, user){
		if(err){
			res.json(err);
		}
		if(user){
	 		user.activated = true;
	 		user.status = "Semi-Verified";
	 		user.save(function(err){
	 			if(err) {
	 				res.json(err);
	 			}
	 			else {
	 				var response_object = { status : 1 , message: "User activated"};
	 				res.json(response_object);
	 			}
	 		});
	 	}
	 	else {
	 		var response_object = { status : 2 , message: "User not found"};
	 		res.json(response_object);
	 	}
	});
});

// Controller: Delete User
// Description: Deletes the User
// URL: http://www.domain.com/users/delete/<userid>
// Mehod: DELETE
// Parameters: userid
// Returns: "Successfully Deleted" message, else error message.

router.delete('/delete/:userid',function(req,res,next){

	var response_obj;
	userSchema.remove({'_id':req.params.userid},function(err,result){
		if(err){
			console.log(err);
			res.json(err);
		}else{
			response_obj = { status : 1 , message : "User Deleted"};
			res.json(response_obj);
		}
	});	
});

// Controller: Update a user information
// URL: http://www.domain.com/users/<userid>
// Method: POST
// Parameters: Attributes of coupons like code, image, title etc.
// Returns: Status and Message

router.post('/edit/:userid', function(req, res, next){
	var response_obj;

	var query = userSchema.where( {_id : req.params.userid} );

	query.findOneAndUpdate( { "$set" : req.body },
		function(err, coupon){
			if(err){
				console.log(err);
					response_obj={status:1, message:"Something went wrong"};
					res.send(response_obj);
			}
			else{
				if(coupon){
					response_obj={status:2, message:"User information Updated"};
					res.send(response_obj);
				}
				else{
					response_obj={status:3, message:"user not found"};
					res.send(response_obj);
				}

			}
		});
});


module.exports = router;
