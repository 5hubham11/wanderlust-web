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

const MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';
 
app.get("/",(req,res)=>{
    console.log("testing");
    res.send("Testing");
})
const port=8080;
app.listen(port ,()=>{
    console.log("Server is working");
})

main()
    .then(()=>{
        console.log("Connected sucsess");
    })
    .catch((err)=>{
        console.log(err);
    })
async function main() {
    await mongoose.connect(MONGO_URL);
}

// app.get("/testListing",async(req,res)=>{
//     console.log("testing");
//     res.send("Working");
//     let sampleList=new Listing({
//         little:"My new Vill",
//         description:"By the beach",
//         price: 1200,
//         location:"calangute,Goa",
//         country:"India",
//     });
//     await sampleList.save();
//     console.log("sample save was saved");
// }); 


//index Rought
app.get("/listing",async(req,res)=>{
    const allListing=await Listing.find({});
    res.render("listings/index.ejs",{allListing});
}) ;
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
    
app.delete("/listing/:id/delete",async(req,res)=>{
    const {id}=req.params;
    let deletedList=await Listing.findByIdAndDelete(id);
    console.log(deletedList);
    res.redirect("/Listing");
     
})