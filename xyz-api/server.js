const EXPRESS = require('express');
const http = require("http");
const cors = require('cors')
const mongoose = require("mongoose");
var SlotsModel = require('./models/slotSchema');
var ParkingsModel = require('./models/parkingSchema');

const app = new EXPRESS()


var uri = "mongodb://localhost:27017/xyzparking";

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});


app.use(cors({
    origin: '*'
}))


app.use(EXPRESS.json({limit: '100mb'}))

app.use(EXPRESS.urlencoded({ extended: false, limit: '100mb' }))

const server = http.createServer(app);


app.get("/", (req, res) => {
    res.send("Welcome to XYZ PARKING API")
})


//Generate Slots
app.post("/slots", (req, res) => {
    let { slots, entrance } = req.body;
    let slotsArr = [];
    let slotsId = Math.floor(Math.random()*90000) + 10000;
    let nearestEntrances = Array.from(Array(entrance).keys());


    for(let i = 0; i < slots; i++){
        slotsArr.push({
            slotNum: i,
            slotsId,
            nearestEntrance: nearestEntrances
        })
    }
    SlotsModel.deleteMany({})
    .then(() => {
        SlotsModel.insertMany(slotsArr).then(function(){
            console.log("Data inserted")  // Success
            res.status(200).json({id: slotsId});
        }).catch(function(error){
            console.log(error)      // Failure
            res.status(400).json({message: 'Something Went wrong!'})
        });  
    }).catch(function(error){
        console.log(error)      // Failure
        res.status(400).json({message: 'Something Went wrong!'})
    });
})

//Park Car
app.post("/park", async (req, res) => {
    
    let { slot } = req.body;

   let mySlot = await SlotsModel.findById(slot._id)

    ParkingsModel.create(req.body)
    .then(a => {
        mySlot.parking = a;
        mySlot.isBusy = true;
        mySlot.save();
        res.status(200).json({data: a});
    })
    .catch(function(error){
        console.log(error)      // Failure
        res.status(400).json({message: 'Something Went wrong!'})
    });
})

//Unpark Car
app.get("/unpark/:id", async (req, res) => {
    let { id } = req.params 

   let mySlot = await SlotsModel.findById(id)


   mySlot.isBusy = false;
   delete mySlot.parking;

    mySlot.save();

    
        res.status(200).json({message: 'Unparked successfully!'});
   
})


//Get Slots by Id
app.get("/slots/:id", (req, res) => {
        let id = req.params.id;

        SlotsModel.find({ slotsId: id })
        .populate("parking")
        .then(data => {
            res.send(data);
        }) 
        .catch(err =>{
            res.status(400).json({message: 'Something Went wrong!'})
        })
})

//Update Slot by Id
//Get Slots by Id
app.put("/slot/:id", (req, res) => {
    let id = req.params.id;
    let slot = req.body;

    SlotsModel.findOneAndUpdate({_id: id}, slot, {new: true},function(err, data) {
        if(err){
            console.log(err);
            res.status(400).json({message: 'Something Went wrong!'})
        }
        else{
            res.send(data);
        }
    });
})


//Delete Slot by Id
app.delete("/slot/:id", (req, res) => {
    let id = req.params.id;

    SlotsModel.deleteOne({_id: id},function(err, data) {
        if(err){
            console.log(err);
            res.status(400).json({message: 'Something Went wrong!'})
        }
        else{
            res.send(data);
        }
    });
})




















const port = 4000;



server.listen(port, function() {
  console.log("Server is running on Port: " + port);
});