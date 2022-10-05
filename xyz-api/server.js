const EXPRESS = require('express');
const http = require("http");
const cors = require('cors')
const mongoose = require("mongoose");
const moment = require('moment');
const momentz = require('moment-timezone')
const socket = require("socket.io");


var SlotsModel = require('./slotSchema');
var ParkingsModel = require('./parkingSchema');
const { migrate, data } = require('./seeder');
const app = new EXPRESS()


var uri = "mongodb://localhost:27017/xyzparkings";

mongoose.connect(uri, { 
    useUnifiedTopology: true, 
    useNewUrlParser: true,
    useFindAndModify: false
 });

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

//local timezone
momentz.tz.setDefault('Asia/Manila');



app.use(cors({
    origin: '*'
}))


app.use(EXPRESS.json({limit: '100mb'}))

app.use(EXPRESS.urlencoded({ extended: false, limit: '100mb' }))

const server = http.createServer(app);

// socket cors config
const io = socket(server, {
    cors: {
      origin: '*',
    },
    // path: "/"
  });

//Serve socket as middleware.
app.use(function(req, res, next){
  req.io = io;
  next();
});


let slotsId = null

io.on('connection', async function(socket){

    socket.on('connected', () => {
    io.emit("USER_CONNECTED", socket.id);
    });
    //Socket Connecting!
 
    socket.on('disconnect', () => {
        //    Object.entries(global.users).forEach(([a, b]) =>{
        //      let ind = b.indexOf(socket.id);
        //       if(ind !== - 1) {
        //           global.users[a].splice(ind, 1);
        //           let cnt = global.users[a].length;
        //           if(cnt === 0){
        //             delete global.users[a];
        //           }
        //         }
        //   });
      console.log('Socket Id: ' + socket.id)
      console.log(`UserId SocketID ${socket.id} is disconnecting!`)
    })
  });



app.get("/", (req, res) => {
    res.send("Welcome to XYZ PARKING API")
})


//Generate Slots
app.post("/slots", (req, res) => {
    let { slots, entrance, merge } = req.body;
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

    if(merge){
        migrate().then(() => {
            req.io.emit('set-slotsId', {...req.body, slotsId: 85337});
            res.status(200).json({id: 85337});
        }).catch((err) => {
            console.log(err)
            res.status(400).json({message: 'Something Went wrong! Merged'})
        });
        // req.io.emit('set-slotsId', {...req.body, slotsId: 85337});
    } else {


    SlotsModel.deleteMany({})
    .then(() => {
        SlotsModel.insertMany(slotsArr).then(function(){
           
            
            res.status(200).json({id: slotsId});
        }).catch(function(error){
            console.log(error)      // Failure
            res.status(400).json({message: 'Something Went wrong!'})
        });  
    }).catch(function(error){
        console.log(error)      // Failure
        res.status(400).json({message: 'Something Went wrong!'})
    });
    }

})

//Park Car
app.post("/park", async (req, res) => {
    
    let { slot, numberPlate, slotType, carType } = req.body;
    console.log(req.body)
  

    let park = await ParkingsModel.findOne({numberPlate})

    


    let mySlot = await SlotsModel.findById(slot._id)

    if(!mySlot){
        return res.status(400).json({message: 'Slot not found!'})
    }



    if(park && !park.parkedEnd){
        console.log("still on park")
            return res.status(400).json({message: 'Still on parking!'})
        }

    

        let start = moment(park && park.parkedEnd);
        let hrs = moment().diff(start, 'hours');


    if(park && hrs < 1){

     
  
        console.log('W/1 1 hr')
        mySlot.parking = park;
        mySlot.isBusy = true;
        mySlot.save();
        park.slot = mySlot;
        park.parkedStart = new Date;
        park.save();


        // Object.keys(global.users).forEach(a => {
            // users[a].forEach(ab => {
                // console.log('Sending back to FE... ' +  JSON.stringify(request.data))
                req.io.emit('parking-update', 'park');
                // })
        // })


        return res.status(200).json({data: 'done'});

    } else {

        console.log('NOT RETURNEE')
return ParkingsModel.create({
    slotType,
    carType,
    numberPlate,
    slot: mySlot
})
.then(a => {
    console.log('SLOT CREATED')
    console.log(a);
    mySlot.parking = a;
    mySlot.isBusy = true;
    mySlot.save();
    req.io.emit('parking-update', 'park');
    return res.status(200).json({data: 'done'});
})
.catch(function(error){
    console.log(error)      // Failure
   return res.status(400).json({message: 'Something Went wrong!'})
});
}
})

//Unpark Car
app.get("/unpark/:id", async (req, res) => {
    let { id } = req.params 

   let mySlot = await SlotsModel.findById(id)
   let park = await ParkingsModel.findById(mySlot.parking._id)

   mySlot.isBusy = false;
   park.parkedEnd = new Date;
   delete mySlot.parking;

    mySlot.save();
    park.save();
    req.io.emit('parking-update', 'unpark');
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
            req.io.emit('parking-update', 'update');
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




















const port = 3000;



server.listen(port, function() {
  console.log("Server is running on Port: " + port);
});