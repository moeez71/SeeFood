dotenv = require("dotenv");
dotenv.config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pantryRouter = require('./routes/pantry');
var calorieRouter = require('./routes/calorie')
var calorieLimit = require('./routes/callimit')

var app = express();
var mongoose = require('mongoose')
// const connection = mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true,useUnifiedTopology:true})
const connection = mongoose.connect("mongodb://localhost:27017/shazam-local",{useNewUrlParser: true,useUnifiedTopology:true});


connection.then((db)=>{
  console.log("connected successfully")
},(err)=>{
console.log(err)
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/pantry', pantryRouter)
app.use('/calorie', calorieRouter)
app.use('/limit', calorieLimit)

const PORT= process.env.PORT || 5000;

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));

module.exports = app;
