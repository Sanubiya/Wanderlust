const mongoose = require('mongoose');
const Review = require('./review.js');
const Owner= require('./user.js');
const Schema= mongoose.Schema;

// const MONGO_URL="mongodb://127.0.0.1:27017/Wanderlust";
// main().then(()=>{
//     console.log("Connect with DB");
// })
// .catch(err => console.log(err));

// async function main() {
//   await mongoose.connect(MONGO_URL);
// };

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        filename:String,
        url:String 
    },
    price: Number,
    location: String,
    country: String,
    reviews:[{
        type: Schema.Types.ObjectId,
        ref:"Review",
    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    category:{
        type:String,
        enum:["Trending","Pool","Castles","Iconic","Rooms","Beach","Mountains","TinyHomes","Camping","Farms","Arctic"],
    }

    
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}})
    }
})


const Listing=mongoose.model("listing",listingSchema);
module.exports=Listing;