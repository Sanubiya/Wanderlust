const express = require("express");
const router=express.Router({mergeParams:true});
const wrapasync = require("../utils/Wrapasync.js")
const reviewController=require("../Controllers/reviews.js")

const{validateReview, isLoggedIn, isReviewAuthor}=require("../middleware.js")


// Add Review Route
router.post("/",isLoggedIn, validateReview , wrapasync(reviewController.addNewRoute));
// Delete Review Route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapasync(reviewController.deletereviewRoute));

module.exports=router;
