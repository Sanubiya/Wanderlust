const Joi = require('joi');
module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().min(0).required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    image: Joi.string().allow("",null),
    category: Joi.string().valid(
      "Trending", "Pool", "Castles", "Iconic", "Rooms",
      "Beach", "Mountains", "TinyHomes", "Camping", "Farms", "Arctic"
    ).required()
}).required()
});


module.exports.reviewSchema=Joi.object({
  review:Joi.object({
    rating:Joi.number().required().min(1).max(5),
    comment:Joi.string().required()
  }).required()
})

