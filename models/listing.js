const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {   // match "title" from data.js
        type: String,
        required: true,
    },
    description: String,
    price: Number,
    image: {   // make image an object instead of string
        filename: String,
        url: {
            type: String,
            default: "https://unsplash.com/photos/three-golden-fireworks-explode-in-the-night-sky-CO85Eu7_4fI",
            set: (v) =>
                v === ""
                    ? "https://images.unsplash.com/photo-1624049321569-f483adecb8fa?q=80&w=870&auto=format&fit=crop"
                    : v,
        },
    },
    location:{
        String,
    
    }, 
    country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
