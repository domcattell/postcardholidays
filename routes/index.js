const express = require("express"),
    router = express.Router({
        mergeParams: true
    }),
    passport = require("passport"),
    user = require("../models/user"),
    deal = require("../models/postcard");
middleware = require("../middleware")

// *****************************
// GET ROUTES
// *****************************
router.get("/", (req, res) => {
    res.redirect("/deals");
});

router.get("/deals", (req, res) => {
    deal.find({}, (err, deals) => {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {
                deals: deals
            });
        };
    });
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.get("/login", (req, res) => {
    res.render("login");
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/deals");
});

// *****************************
// POST ROUTES
// *****************************
router.post("/register", (req, res) => {
    const newUser = new user({
        username: req.body.username
    });
    user.register(newUser, req.body.password, (err, user) => {
        if (err) {
            req.flash("error", err.message);
            return res.redirect("register");
        }
        passport.authenticate("local")(req, res, () => {
            res.redirect("back");
        });
    });
});

router.post("/login", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/deals",
        failureRedirect: "/login",
        failureFlash: true,
    })(req, res);
});

module.exports = router;