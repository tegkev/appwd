var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var mongoose = require('mongoose');
var formidable = require('express-formidable');


mongoose.connect('mongodb://localhost::27017/nodejs');

var index = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');

var User= require('./models/UserModel');

// a firewall to manage the role of my users
var RoleMiddlewaire = require('./middleware/RoleMiddleware');


var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'twig');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/admin/',RoleMiddlewaire.admin);
app.use('/api/*-(authenticate)/',RoleMiddlewaire.user);
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));

app.use(require('express-session')({
    secret: 'test',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(flash());

app.use(passport.session());
app.use('/', index);
app.use('/users', users);

app.use('/api',api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
    next(err);
});
passport.use(new LocalStrategy(
    {
        usernameField: 'email',
        passwordField: 'password'
    },
    function(email, password, done) {
        User.findOne({ email: email }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        });
    }
));
//passport
app.use(passport.initialize());
app.use(flash());
app.use(passport.session());
// serialize and deserialize

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
module.exports = app;


