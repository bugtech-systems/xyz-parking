const seeder = require('mongoose-seed');
const mongoose = require("mongoose");


const db = "mongodb://localhost:27017/xyzparkings";
var ParkingsModel = require('./parkingSchema');
var SlotsModel = require('./slotSchema');



mongoose.connect(db, { 
  useUnifiedTopology: true, 
  useNewUrlParser: true
}).then(a => {
  // ParkingsModel.insertMany(data[0].documents);
  // SlotsModel.insertMany(data[1].documents);
  // console.log('INSERTED')

  ParkingsModel.deleteMany({"_id": {$in: [data[0].documents.map(ab=> {return ab._id})]}})
  console.log('DELETED')

})
.catch(err => console.log(err))

;

// No longer necessary:
// mongoos/e.set('useFindAndModify', false);



// seeder.connect(db , { 
//     // useUnifiedTopology: true
//     // useNewUrlParser: true
//  }, function() {
//     seeder.loadModels(["parkingSchema.js", "slotSchema.js"]);
//     seeder.clearModels([
//         'Parking'
//         , 'Slot'
//     ]);
//     seeder.populateModels(data, function(err, done){
//         if(err){
//             return console.log("seed err", err);
//         }
//         if(done){
//             return console.log("seed done", done);
//         }
//     seeder.disconnect();

//     })
//   })  

const data = [
    {
        'model': "Parking",
        'documents': [{
            "_id":  "6339ac733dafe44d0de35fc6",
            "numberPlate": "118-LOP",
            "slotType": "medium",
            "carType": "small",
            "parkedStart": "",
            "slot": "6339aba952d84990f623bb66",
            "parkedEnd": ""
          }, {
            "_id": "6339ace13dafe44d0de35fd9", 
            "numberPlate": "574-RVL",
            "slotType": "medium",
            "carType": "medium",
            "parkedStart": "1664637793567",
            "slot": "6339aba952d84990f623bb6d",
            "__v": 0
          },{
            "_id": "6339acf13dafe44d0de35fe0", 
            "numberPlate": "281-NWD",
            "slotType": "small",
            "carType": "small",
            "parkedStart": "1664724209027",
            "slot": "6339aba952d84990f623bb71",
            "__v": 0
          },{
            "_id": "6339ad1b3dafe44d0de35fea", 
            "numberPlate": "353-LRR",
            "slotType": "large",
            "carType": "medium",
            "parkedStart": "1664724251945",
            "slot": "6339aba952d84990f623bb7c",
            "__v": 0,
            "parkedEnd": "1664724404109"
          },{
            "_id": "6339ad323dafe44d0de35ff1", 
            "numberPlate": "452-GUX",
            "slotType": "medium",
            "carType": "small",
            "parkedStart": "1664724274725",
            "slot": "6339aba952d84990f623bb67",
            "__v": 0
          },{
            "_id": "6339ad3d3dafe44d0de35ff8", 
            "numberPlate": "039-QEO",
            "slotType": "small",
            "carType": "small",
            "parkedStart": "1664724285011",
            "slot": "6339aba952d84990f623bb6e",
            "__v": 0
          },{
            "_id": "6339add53dafe44d0de3600d", 
            "numberPlate": "957-LQI",
            "slotType": "large",
            "carType": "medium",
            "parkedStart": "1664724437412",
            "slot": "6339aba952d84990f623bb7c",
            "__v": 0,
            "parkedEnd": "1664724472506"
          },{
            "_id": "6339ae003dafe44d0de3601a", 
            "numberPlate": "804-LRY",
            "slotType": "large",
            "carType": "large",
            "parkedStart": "1664724480930",
            "slot": "6339aba952d84990f623bb7c",
            "__v": 0,
            "parkedEnd": "1664724486929"
          },{
            "_id": "633bdae57528bed02bcac486", 
            "numberPlate": "009-JXJ",
            "slotType": "large",
            "carType": "large",
            "parkedStart": "1664867044951",
            "slot": "633bda0e7528bed02bcac468",
            "__v": 0
          },{
            "_id": "633bdb257528bed02bcac48d", 
            "numberPlate": "707-ZEX",
            "slotType": "medium",
            "carType": "small",
            "parkedStart": "1664867109207",
            "slot": "633bda0e7528bed02bcac460",
            "__v": 0
          },{
            "_id": "633bdb327528bed02bcac494", 
            "numberPlate": "968-UKL",
            "slotType": "medium",
            "carType": "medium",
            "parkedStart": "1664852602654",
            "slot": "633bda0e7528bed02bcac461",
            "__v": 0,
            "parkedEnd": "1664867505117"
          },{
            "_id": "633bdb3a7528bed02bcac49b", 
            "numberPlate": "895-YYO",
            "slotType": "small",
            "carType": "small",
            "parkedStart": "1664780730535",
            "slot": "633bda0e7528bed02bcac46e",
            "__v": 0,
            "parkedEnd": "1664867297936"
          }]
    },
    {
        'model': 'slots',
        'documents': [{
            "_id": "633c5f6390d07c95c75d636c",
            "slotNum": 0,
            "isBusy": false,
            "nearestEntrance": [
              0,
              1,
              2
            ],
            "slotType": "medium",
            "slotsId": 85337,
            "__v": 0
          },{
            "_id": "633c5f6390d07c95c75d636d",
            "slotNum": 1,
            "isBusy": false,
            "nearestEntrance": [
              1,
              2
            ],
            "slotType": "medium",
            "slotsId": 85337,
            "__v": 0
          },{
            "_id": "633c5f6390d07c95c75d636e",
            "slotNum": 2,
            "isBusy": false,
            "nearestEntrance": [
              2,
              1,
              0
            ],
            "slotType": "small",
            "slotsId": 85337,
            "__v": 0
          },{
            "_id": "633c5f6390d07c95c75d636f",
            "slotNum": 3,
            "isBusy": false,
            "nearestEntrance": [
              0,
              1,
              2
            ],
            "slotType": "medium",
            "slotsId": 85337,
            "__v": 0
          },{
            "_id": "633c5f6390d07c95c75d6370",
            "slotNum": 4,
            "isBusy": false,
            "nearestEntrance": [
              0,
              1,
              2
            ],
            "slotType": "medium",
            "slotsId": 85337,
            "__v": 0
          },{
            "_id": "633c5f6390d07c95c75d6371",
            "slotNum": 5,
            "isBusy": false,
            "nearestEntrance": [
              0,
              1,
              2
            ],
            "slotType": "medium",
            "slotsId": 85337,
            "__v": 0
          },{
            "_id": "633c5f6390d07c95c75d6372",
            "slotNum": 6,
            "isBusy": false,
            "nearestEntrance": [
              0,
              1,
              2
            ],
            "slotType": "medium",
            "slotsId": 85337,
            "__v": 0
          },{
            "_id": "633c5f6390d07c95c75d6373",
            "slotNum": 7,
            "isBusy": false,
            "nearestEntrance": [
              1,
              0
            ],
            "slotType": "large",
            "slotsId": 85337,
            "__v": 0
          },{
            "_id": "633c5f6390d07c95c75d6374",
            "slotNum": 8,
            "isBusy": false,
            "nearestEntrance": [
              0,
              1,
              2
            ],
            "slotType": "medium",
            "slotsId": 85337,
            "__v": 0
          },{
            "_id": "633c5f6390d07c95c75d6375",
            "slotNum": 9,
            "isBusy": false,
            "nearestEntrance": [
              0,
              1,
              2
            ],
            "slotType": "medium",
            "slotsId": 85337,
            "__v": 0
          }]
    }
]