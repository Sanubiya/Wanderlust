const express = require("express");
const router=express.Router();
const wrapasync = require("../utils/Wrapasync.js")
const {isLoggedIn,isOwner,validatelisting}=require("../middleware.js")
const listingController=require("../Controllers/listings.js")
const Listing = require("../models/listing.js");
const {listingSchema,}=require("../Schema.js");

const multer  = require('multer')
const {storage}=require("../cloudconfig.js");
const upload=multer({storage})



// INDEX ROUTE
// Create Route
router.route("/")
.get( wrapasync(listingController.index))
.post( isLoggedIn,upload.single('listing[image]'),validatelisting,wrapasync( listingController.createRoute));





// NEW ROUTE
router.get("/new",isLoggedIn, listingController.newRoute)

// SHOW ROUTE
// Update Route
// Delete Route

router.route("/:id")
.get( wrapasync(listingController.showRoute))
.put(isLoggedIn,isOwner,upload.single('listing[image]'),validatelisting, wrapasync(listingController.updateRoute))
.delete( isLoggedIn,isOwner,wrapasync(listingController.deleteRoute));



// Edit Router

router.get("/:id/edit",isLoggedIn,isOwner, wrapasync(listingController.editRoute));

module.exports=router;