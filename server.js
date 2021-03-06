// =======================
// get the packages we need ============
// =======================
var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');

var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('./config'); // get our config file
var User   = require('./app/models/user'); // get our mongoose model
    
// Static settings
var root = __dirname + "/public/";

// =======================
// configuration =========
// =======================
var port = process.env.PORT || 8080; // used to create, sign, and verify tokens
mongoose.connect(config.database); // connect to database
app.set('superSecret', config.secret); // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// =======================
// routes ================
// =======================
// basic route
app.get('/', function(req, res) {
    console.log("Index requested");
    res.sendFile(root + 'index.html');
});

app.get('/*.html', function(req, res) {
    console.log("HTML requested");
    res.sendFile(root + req.params[0] + ".html");
});

app.get('/css/*', function(req, res) {
    console.log("Request: " + "/css/" + req.params[0]);
    res.sendFile(root + "/css/" + req.params[0]);
});

app.get('/js/*', function(req, res) {
    console.log("Request: " + "/js/" + req.params[0]);
    res.sendFile(root + "/js/" + req.params[0]);
});

app.get('/images/*', function(req, res) {
    console.log("Request: " + "/images/" + req.params[0]);
    res.sendFile(root + "/images/" + req.params[0]);
});

app.get('/lib/*', function(req, res) {
    console.log("Request: " + "/lib/" + req.params[0]);
    res.sendFile(root + "/lib/" + req.params[0]);
});

// Do nuke this from final app
app.get('/setup', function(req, res) {

  // create a sample user
  var nick = new User({ 
    name: 'admin', 
    password: 'admin',
    admin: true 
  });

  // save the sample user
  nick.save(function(err) {
    if (err) throw err;

    console.log('Admin user saved successfully');
  });

  nick = new User({
    name: "user", 
    password: 'user', 
    admin: false
  });

  // save the sample user
  nick.save(function(err) {
    if (err) throw err;

    console.log('Normal user saved successfully');
    res.json({ success: true });
  });

});

// API ROUTES -------------------
// get an instance of the router for api routes
var apiRoutes = express.Router(); 

// route to authenticate a user (POST http://localhost:8080/api/authenticate)
apiRoutes.post('/authenticate', function(req, res) {

    console.log('Got authenticate request');

  // find the user
  User.findOne({
    name: req.body.name
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, app.get('superSecret'), {
          expiresIn: "1h" 
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          admin: user.admin,
          token: token
        });
      }   

    }

  });
});

// route middleware to verify a token
apiRoutes.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
      if (err) {
        return res.status(403).send({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
    
  }
});

// route to show a random message (GET http://localhost:8080/api/)
apiRoutes.get('/', function(req, res) {
  res.json({ message: 'Welcome to the coolest API on earth!' });
});

// return the decoded token
apiRoutes.get('/me', function(req, res) {
    res.json(req.decoded);
});

// route to return all users (GET http://localhost:8080/api/users)
apiRoutes.get('/users', function(req, res) {
  User.find({}, function(err, users) {
    res.json(users);
  });
});   

// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes);

// =======================
// start the server ======
// =======================
app.listen(port);
console.log('Magic happens at http://localhost:' + port);

// vim: ts=4 et
