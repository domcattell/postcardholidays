const express = require("express"),
    router = express.Router({
        mergeParams: true
    }),
    comment = require("../models/comment"),
    deal = require("../models/postcard"),
    middleware = require("../middleware");

// *****************************
// GET ROUTES
// *****************************
router.get("/:comment_id/edit", middleware.checkCommentOwnership, (req, res) => {
    comment.findById(req.params.comment_id, (err, foundComment) => {
        if (err) {
            res.redirect("back");
        } else {
            res.render("editcomment", {
                deal_id: req.params.id,
                comment: foundComment
            });
        };
    });
});

// *****************************
// POST ROUTES
// *****************************
router.post("/", middleware.isLoggedIn, (req, res) => {
    deal.findById(req.params.id, (err, deal) => {
        if (err) {
            res.redirect("/deals");
        } else {
            comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log(err);
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    deal.comments.push(comment);
                    deal.save();
                    res.redirect(`/deals/holiday/${deal._id}`);
                };
            });
        };
    });
});

// *****************************
// PUT ROUTES
// *****************************
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {

    comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        if (err) {
            console.log("back");
        } else {
            res.redirect(`/deals/holiday/${req.params.id}`);
        };
    });
});

// *****************************
// DELETE ROUTES
// *****************************
router.delete("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    comment.findByIdAndRemove(req.params.comment_id, (err) => {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("back");
        };
    });
});

module.exports = router;