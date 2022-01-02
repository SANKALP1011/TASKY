/* Requiring express module -: */
const express = require("express");
/* Requiring ejs module -: */
const ejs = require("ejs");
/* Requiring moongose module -: */
const moongose = require("mongoose");
/* Using express module -: */
const app = express();
/* Requiring date module -: */
const CurrentDate = require(__dirname+"/date.js");
/* Express body Parser -: */
app.use(express.urlencoded({extended:true}));
/* Setting ejs as a view engine -: */
app.set("view engine","ejs");
/* Using styelsheets file -: */
app.use(express.static(__dirname + "/public"));

const uri = process.env.MONGODB_URI;

/* Connecting to mongodb -: */
moongose.connect(uri || "mongodb://127.0.0.1:27017/ListDb",{useNewUrlParser: true});

/* Mogodb schema -:  */
const ListSchema = new moongose.Schema({
    ToDoItems: String
})

/* Mongodb model -: */
const ListModel = new moongose.model("todoitems",ListSchema);

/* Fetching the data from the database -: */
app.get("/",function(req,res){
    ListModel.find({},function(err,result){
        res.render("List",{
            Date: CurrentDate(),
            AddedItems: result
        })
    });
});

/* Adding data to the database -: */
app.post("/", async function(req,res){
    var newItems = req.body.NewItems;
    console.log(newItems);
    const NewAddedItems = new ListModel({
        ToDoItems: newItems
    });
    try{
        await NewAddedItems.save();
        res.redirect("/");
    }
    catch (err){
    }
});

/* Deleting the data from the database -: */
app.post("/delete",function(req,res){
    var id = req.body.ListCheckBox;
    ListModel.findByIdAndRemove(id,function(err,res){
        if (err){
            console.log(err)
        }
        else{
            console.log("Successfully deleted")
        }
    })
    res.redirect("/");
});

/* Connecting to the server -: */
app.listen( process.env.PORT || "3004",function(){
    console.log("server up and running");
});

