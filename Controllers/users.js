const User = require("../models/user");
const passport = require("passport");
module.exports.signup= (req, res) => {
    res.render("listings/signup")
}
module.exports.signupPost=async (req, res) => {
    try {

        let { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser,(err)=>{
          if(err){
            return next();
          }
          req.flash("success", "Welcome to Wanderlust");
          res.redirect("/listings")
        })
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup")
    }


}
module.exports.login= (req, res) => {
    res.render("listings/login")
}
module.exports.loginPost=async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("error", "Invalid username or password");
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome back to Wanderlust");
      let redirectUrl=res.locals.redirectUrl||"/listings"
      res.redirect(redirectUrl);
    });
  })(req, res, next);
}

module.exports.logout=(req,res,next)=>{
  req.logOut((err)=>{
    if(err){
      return next(err);
    }
    req.flash("success","You logged out!");
    res.redirect("/listings")
  })
}