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

// router.get('/listings', async (req, res) => {
//   const { category } = req.query;

//   let filter = {};
//   if (category) {
//     filter.category = category;
//   }

//   const allListings = await Listing.find(filter);
//   res.render('listings/show.ejs', { allListings, category });
// });
// Show listings by category
// router.get('/category/:categoryName', async (req, res) => {
//   const { categoryName } = req.params;

//   // Validate category (optional)
//   const allowedCategories = [
//     "Trending", "Pool", "Castles", "Iconic", "Rooms",
//     "Beach", "Mountains", "TinyHomes", "Camping", "Farms", "Arctic"
//   ];

//   if (!allowedCategories.includes(categoryName)) {
//     return res.status(404).send("Category not found");
//   }

//   const allListings = await Listing.find({ category: categoryName });
//   res.render('listings/show.ejs', { allListings, category: categoryName });
// });






module.exports=router;