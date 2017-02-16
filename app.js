var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var multer = require('multer');
var fs = require('fs');



var Storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./Images");
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});
var upload = multer({ storage: Storage }).array("imgUploader", 3);




var index = require('./routes/index');
var users = require('./routes/users');
var connections = require('./routes/connections');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get("/Upload", function(req, res) {

});


app.post("/Upload", function(req, res) {
    upload(req, res, function(err) {
        if (err) {
            return res.end("Something went wrong!");
        }

    });
});


//login get
app.use('/', index);
app.use('/users', users);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(3005);
console.log("Reading port 3005")
module.exports = app;


//register get
app.get('/register', function(req, res) {
    res.render('register', { msg: '' });
});


//register post method
app.post('/register', function(req, res) {
    if (req.body.password == req.body.confirmpassword) {
        connections(req.body).save(function(err, data) {

            if (err) throw err
            else {
                res.redirect('/');
            }

        });
    } else {
        res.render('register', { msg: "Password and Confirmation password Should match" });
    }
});


// app.post('/welcome', function(req, res) {
//     console.log(req.body);
//     res.render('welcome', { data: req.body.uname });
// });

//login get
app.get('/', function(req, res) {
    res.render('login');
});

//login post


app.post('/welcome', function(req, res) {
    connections.find({ $and: [{ 'email': req.body.uname }, { 'password': req.body.psw }] }, function(err, data) {
        console.log(data);
        if (err) {
            console.log(err);
        } else if (data == "") {
            res.redirect('/');
        } else {
            res.render('welcome', { data: data });
        }
    });

});

app.get('/welcome', function(req, res) {
    res.render('welcome');
});

//Logout get method

// app.get('/Sign Out', function(req, res) {
//     res.redirect('/');
// });