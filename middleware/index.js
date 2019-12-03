const deal = require("../models/postcard"),
    comment = require("../models/comment"),
    middlewareObj = {};


//CHECK IF USER IS LOGGED IN
middlewareObj.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Please login first")
    res.redirect("/login")
}

//CHECK IF USER IS ADMIN
middlewareObj.isAdmin = function (req, res, next) {
    if (req.user && req.user.adminAccess === true) {
        return next();
    }
    res.status(401).send("Error: You are not authorised to access this page");
};

//CHECK IF USER OWNS COMMENT
middlewareObj.checkCommentOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        comment.findById(req.params.comment_id, (err, foundComment) => {
            if (err) {
                console.log(err);
            } else {
                if (foundComment.author.id.equals(req.user._id) || req.user.adminAccess === true) {
                    next();
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    };
};

//SEARCH BAR REGEEX
middlewareObj.escapeRegex = function (text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

//SEARCH BAR
middlewareObj.search = function (req, res, next) {
    if (req.query.search) {
        const regex = new RegExp(middleware.escapeRegex(req.query.search), "gi");
        deal.find({
            location: regex
        }, (err, deals) => {
            if (err) {
                console.log(err)
            } else {
                res.render("search", {
                    deals: deals,
                    search: req.query.search
                });
            };
        });

    } else {
        return next();
    };
};

module.exports = middlewareObj