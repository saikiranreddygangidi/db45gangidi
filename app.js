var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var Mobile = require("./models/mobile");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var mobileRouter = require("./routes/mobile");
var starsRouter = require("./routes/stars");
var slotsRouter = require("./routes/slot");
var resRouter = require("./routes/resource");
var app = express();

const connectionString = process.env.MONGO_CON;
mongoose = require("mongoose");
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var db = mongoose.connection;
//Bind connection to error event
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connection to DB succeeded");
});
// We can seed the collection if needed on server start
async function recreateDB() {
  // Delete everything
  await Mobile.deleteMany();
  let instance1 = new Mobile({
    mobilecompany: "pixel",
    model: "max z1",
    prize: 1122,
  });
  let instance2 = new Mobile({
    mobilecompany: "apple",
    model: "pro s1",
    prize: 1500,
  });
  let instance3 = new Mobile({
    mobilecompany: "samsung",
    model: "v1",
    prize: 1422,
  });

  instance1.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("First object saved");
  });
  instance2.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("second object saved");
  });
  instance3.save(function (err, doc) {
    if (err) return console.error(err);
    console.log("third object saved");
  });
}
// let reseed = true;
// if (reseed) {
//   recreateDB();
// }
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/mobile", mobileRouter);
app.use("/stars", starsRouter);
app.use("/slot", slotsRouter);
app.use("/resource", resRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
module.exports = app;
