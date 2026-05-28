require("dotenv").config();
const express=require("express");
const app=express();
const mongoose= require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const { findById } = require("./models/listing.js");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({ extended: true }));
const methodOverride=require("method-override");
app.use(methodOverride("_method"));
const ejsMate=require("ejs-mate");
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

 
const MONGO_URL = process.env.MONGO_URL || process.env.ATLASDB_URL;
if (!MONGO_URL) {
  throw new Error("MONGO_URL or ATLASDB_URL environment variable is required");
}
 
const port = process.env.PORT || 8080;

app.get("/", (req, res) => {
    res.redirect("/listing");
});

main()
    .then(() => {
        console.log("Connected success");
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error(err);
    });

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.get("/listing", async (req, res) => {
    const allListing = await Listing.find({});
    res.render("listings/index.ejs", { allListing });
});
//new listing
app.get("/listings/new",async(req,res)=>{
     res.render("listings/new.ejs")
})
//show route
app.get("/listing/:id",async(req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    // console.log(listing);
    res.render("listings/show.ejs",{listing});
})

app.post("/listings",async(req,res)=>{
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    console.log(newListing);
    res.redirect("/listing");     
})
//edit
app.get("/listings/:id/edit",async(req,res)=>{
    const {id}=req.params;
    const obj=await Listing.findById(id);
    console.log(obj);
    res.render("listings/edit.ejs",{obj});
     
})
//update
app.put("/listings/:id",async(req,res)=>{
    const {id}=req.params;
    await Listing.findByIdAndUpdate(id,{...req.body.listing});
    res.redirect(`/listings/${id}/edit`);

     
})
//delete
    
app.delete("/listing/:id/delete", async (req, res) => {
    const { id } = req.params;
    let deletedList = await Listing.findByIdAndDelete(id);
    console.log(deletedList);
    res.redirect("/listing");
});