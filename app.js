if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const Listing = require("./models/listing.js");

const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const listingsRoute = require("./Routes/listings.js");
const reviewsRoute = require("./Routes/Reviews.js");
const signupRouter = require("./Routes/user.js");
const flash = require("connect-flash")
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("./models/user.js")

app.use(methodOverride('_method'));
app.engine('ejs', ejsMate);
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "/public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));


// const MONGO_URL = "mongodb://127.0.0.1:27017/Wanderlust";
const dbUrl = process.env.ATLAS_DB_URL
main().then(() => {
    console.log("Connect with DB");
})
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect(dbUrl);
};

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: "mysupersecretcode",
    },
    touchAfter: 24 * 3600,
});
store.on("error", (err) => {
    console.log("ERROR MONGO STROE", err)
});

const sessionOptions = {
    store,
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }

};
app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user
    next();
})
app.get("/", (req, res) => {
    res.render("listings/welcome.ejs")
})
app.get("/listings", async (req, res) => {
    const { category } = req.query;
    let allListings;
    if (category) {
        allListings = await Listing.find({ category });
    } else {
        allListings = await Listing.find({});
    }
    res.render("listings/index.ejs", { allListings });
});

  


app.use("/listings", listingsRoute);
app.use("/listings/:id/reviews", reviewsRoute);
app.use("/", signupRouter);


app.use((err, req, res, next) => {
    const status = err.statusCode || 500;
    const message = err.message || "Something went wrong";
    res.status(status).render("listings/error.ejs", { message });
    next();
});

app.listen(8080, () => {
    console.log("Listening on port 8080");
})