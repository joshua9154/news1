// Node hub 2020

var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var home = require("./routes/404");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var patientRouter = require("./routes/patient");
var contactsRouter = require("./routes/contacts");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", home);
app.use("/3", indexRouter);
app.use("/users", usersRouter);
app.use("/patient", patientRouter);
app.use("/contacts", contactsRouter);

var listener = app.listen(8080, function () {
  console.log("Listening on port " + listener.address().port);
});
