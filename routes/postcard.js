const express       = require("express"),
router              = express.Router({mergeParams: true}),
deal                = require ("../models/postcard"),
middleware          = require ("../middleware");

// *****************************
// GET ROUTES
// *****************************
router.get("/create", middleware.isAdmin, (req, res) => {
    res.render("create");
});

router.get("/all", (req, res) => {
    deal.find({}, (err, deals) => {
        if (err) {
            console.log(err);
        } else {
            res.render("all", {
                deals: deals
            });
        };
    });
})

router.get("/holiday/:id/edit", middleware.isAdmin, (req, res) => {
    deal.findById(req.params.id, (err, foundDeal) => {
        if (err) {
            console.log(err);
        } else {
            res.render("edit", {
                deal: foundDeal
            });
        };
    });
});

router.get("/holiday/:id", (req, res) => {
    deal.findById(req.params.id).populate("comments").exec((err, foundDeal) => {
        if (err) {
            console.log(err);
        } else {
            res.render("holiday", {
                deal: foundDeal
            });
        };
    });
});


// *****************************
// POST ROUTES
// *****************************
router.post("/", middleware.isAdmin, (req, res) => {
    req.body.postcard.desc = req.sanitize(req.body.postcard.desc);

    deal.create(req.body.postcard, (err, newDeal) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/deals");
        };
    });
});


// *****************************
// PUT ROUTES
// *****************************
router.put("/holiday/:id", middleware.isAdmin, (req, res) => {
    req.body.postcard.desc = req.sanitize(req.body.postcard.desc);

    deal.findByIdAndUpdate(req.params.id, req.body.postcard, (err, updatedDeal) => {
        if (err) {
            res.redirect("/deals");
        } else {
            res.redirect(`/deals/holiday/${req.params.id}`);
        };
    });
});


// *****************************
// DELETE ROUTES
// *****************************
router.delete("/holiday/:id", middleware.isAdmin, (req, res) => {
    deal.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.redirect("/deals");
        } else {
            res.redirect("/deals");
        };
    });
});

module.exports = router;