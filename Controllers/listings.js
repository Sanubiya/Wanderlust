const Listing = require("../models/listing.js");
const {listingSchema,}=require("../Schema.js");
module.exports.index=async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}
module.exports.newRoute=(req, res) => {
    res.render("listings/new.ejs");
}
module.exports.createRoute=async (req, res) => {
    let url=req.file.path;
    let filename=req.file.filename;
    const newlisting = new Listing(req.body.listing);
    newlisting.owner=req.user._id;
    newlisting.image={filename,url};
    await newlisting.save();
    req.flash("success","New listing created");
    res.redirect("/listings");
};
module.exports.showRoute=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({path:"reviews",populate:{path:"author"},}).populate("owner");
    console.log(listing)
    if(!listing){
        req.flash("error","Listing you request for does not exist");
        return res.redirect("/listings");
    }
    res.render("listings/show.ejs", {listing});
}
module.exports.editRoute=async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you request for does not exist");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { listing })
}
module.exports.updateRoute=async (req, res) => {
    let { id } = req.params;
    let listing=await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    
    if(typeof req.file!=="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
        listing.image={url,filename};
        await listing.save();
    }
    req.flash("success","Listing updated");
    res.redirect("/listings");

}
module.exports.deleteRoute=async (req, res) => {
    let { id } = req.params;
    let deletedlisting = await Listing.findByIdAndDelete(id);
    req.flash("success","Listing deleted");
    res.redirect("/listings")


}