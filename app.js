const express               = require("express"),
app                         = express(),
bodyParser                  = require("body-parser"),
mongoose                    = require("mongoose"),
methodOverride              = require("method-override"),
expressSanitizer            = require("express-sanitizer"),
passport                    = require("passport"),
localStrategy               = require("passport-local"),
passportLocalMongoose       = require("passport-local-mongoose"),
flash                       = require("connect-flash"),
//MODELS
deal                        = require("./models/postcard"),
user                        = require("./models/user"),
comment                     = require("./models/comment"),
//EXPRESS ROUTES
commentRoutes               = require("./routes/comments"),
postcardRoutes              = require("./routes/postcard"),
indexRoutes                 = require("./routes");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
app.use(flash());

//CONNECT DATABASE
mongoose.connect("databaseconnection", {useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.connect("mongodb://localhost/postcard", {useNewUrlParser: true, useUnifiedTopology: true});

//PASSPORT CONFIG
app.use(require("express-session")({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    next();
});

app.all("*", middleware.search);

app.use(indexRoutes);
app.use("/deals/holiday/:id/comments", commentRoutes);
app.use("/deals", postcardRoutes);


app.listen(process.env.PORT, process.env.IP, (req, res) => {
    console.log("server started");
});