const seeder = require('mongoose-seed');
const mongoose = require("mongoose");


const db = "mongodb://localhost:27017/xyzparkings";
var ParkingsModel = require('./parkingSchema');
var SlotsModel = require('./slotSchema');



mongoose.connect(db, { 
  useUnifiedTopology: true, 
  useNewUrlParser: true
}).then(a => {
  
  // console.log('INSERTED')

  ParkingsModel.deleteMany({})
  .then(() => {
    ParkingsModel.insertMany(data[0].documents);
  })
  SlotsModel.deleteMany({}).then(() => {
    SlotsModel.insertMany(data[1].documents);
  })

  console.log('DELETED')
  return;
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
          "_id": "633c7145c20e80069dbf3e04",
          "numberPlate": "106-SIF",
          "slot": "633c5f6390d07c95c75d636c",
          "parkedStart": new Date(1664819141217),
          "slotType": "medium",
          "carType": "medium",
          "__v": 0
        },{
          "_id": "633c7153c20e80069dbf3e0b",
          "numberPlate": "103-KVX",
          "slot": "633c5f6390d07c95c75d6370",
          "parkedStart": new Date(1664883955811),
          "slotType": "small",
          "carType": "small",
          "__v": 0
        },{
          "_id": "633c71c9c20e80069dbf3e12",
          "numberPlate": "047-UQD",
          "slot": "633c5f6390d07c95c75d6372",
          "parkedStart": new Date(1664905673150),
          "slotType": "large",
          "carType": "large",
          "__v": 0
        },{
          "_id": "633c71e1c20e80069dbf3e19",
          "numberPlate": "699-JMG",
          "slot": "633c5f6390d07c95c75d636f",
          "parkedStart": new Date(1664902097264),
          "slotType": "medium",
          "carType": "small",
          "__v": 0
        },{
          "_id": "633c71f2c20e80069dbf3e20",
          "numberPlate": "455-JSW",
          "slot": "633c5f6390d07c95c75d6371",
          "parkedStart": new Date(1664905714661),
          "slotType": "medium",
          "carType": "medium",
          "__v": 0
        },{
          "_id": "633c71fbc20e80069dbf3e27",
          "numberPlate": "479-ZGB",
          "slot": "633c5f6390d07c95c75d636d",
          "parkedStart": new Date(1664905723006),
          "slotType": "small",
          "carType": "small",
          "__v": 0
        },{
          "_id": "633c7203c20e80069dbf3e2e",
          "numberPlate": "359-DMO",
          "slot": "633c5f6390d07c95c75d636e",
          "parkedStart": new Date(1664905731875),
          "slotType": "large",
          "carType": "large",
          "__v": 0
        },{
          "_id": "633c720fc20e80069dbf3e35",
          "numberPlate": "494-PDN",
          "slot": "633c5f6390d07c95c75d6374",
          "parkedStart": new Date(1664905743532),
          "slotType": "small",
          "carType": "small",
          "__v": 0
        },{
          "_id": "633c7219c20e80069dbf3e3c",
          "numberPlate": "704-ALK",
          "slot": "633c5f6390d07c95c75d6375",
          "parkedStart": new Date(1664905753364),
          "slotType": "large",
          "carType": "medium",
          "__v": 0
        },{
          "_id": "633c722bc20e80069dbf3e43",
          "numberPlate": "450-SEW",
          "slot": "633c5f6390d07c95c75d6373",
          "parkedStart": new Date(1664905771661),
          "slotType": "medium",
          "carType": "medium",
          "__v": 0
        }]
    },
    {
        'model': 'slots',
        'documents': [
          {
          "_id": "633c5f6390d07c95c75d636c",
          "Busy": true,
          "nearestEntrance": [
            1,
            2,
            0
          ],
          "slotType": "medium",
          "slotNum": 0,
          "slotsId": 85337,
          "__v": 0,
          "parking": "633c7145c20e80069dbf3e04"
          },{
          "_id": "633c5f6390d07c95c75d636d",
          "Busy": true,
          "nearestEntrance": [
            1,
            2,
            0
          ],
          "slotType": "small",
          "slotNum": 1,
          "slotsId": 85337,
          "__v": 0,
          "parking": "633c71fbc20e80069dbf3e27"
          },{
          "_id": "633c5f6390d07c95c75d636e",
          "Busy": true,
          "nearestEntrance": [
            0,
            1,
            2
          ],
          "slotType": "large",
          "slotNum": 2,
          "slotsId": 85337,
          "__v": 0,
          "parking": "633c7203c20e80069dbf3e2e"
          },{
          "_id": "633c5f6390d07c95c75d636f",
          "Busy": true,
          "nearestEntrance": [
            0,
            1,
            2
          ],
          "slotType": "medium",
          "slotNum": 3,
          "slotsId": 85337,
          "__v": 0,
          "parking": "633c71e1c20e80069dbf3e19"
          },{
          "_id": "633c5f6390d07c95c75d6370",
          "Busy": true,
          "nearestEntrance": [
            0,
            1,
            2
          ],
          "slotType": "small",
          "slotNum": 4,
          "slotsId": 85337,
          "__v": 0,
          "parking": "633c7153c20e80069dbf3e0b"
          },{
          "_id": "633c5f6390d07c95c75d6371",
          "Busy": true,
          "nearestEntrance": [
            0,
            1,
            2
          ],
          "slotType": "medium",
          "slotNum": 5,
          "slotsId": 85337,
          "__v": 0,
          "parking": "633c71f2c20e80069dbf3e20"
          },{
          "_id": "633c5f6390d07c95c75d6372",
          "Busy": true,
          "nearestEntrance": [
            2,
            1,
            0
          ],
          "slotType": "large",
          "slotNum": 6,
          "slotsId": 85337,
          "__v": 0,
          "parking": "633c71c9c20e80069dbf3e12"
          },{
          "_id": "633c5f6390d07c95c75d6373",
          "Busy": true,
          "nearestEntrance": [
            2,
            1,
            0
          ],
          "slotType": "medium",
          "slotNum": 7,
          "slotsId": 85337,
          "__v": 0,
          "parking": "633c722bc20e80069dbf3e43"
          },{
          "_id": "633c5f6390d07c95c75d6374",
          "Busy": true,
          "nearestEntrance": [
            2,
            1,
            0
          ],
          "slotType": "small",
          "slotNum": 8,
          "slotsId": 85337,
          "__v": 0,
          "parking": "633c720fc20e80069dbf3e35"
          },{
          "_id": "633c5f6390d07c95c75d6375",
          "Busy": true,
          "nearestEntrance": [
            1,
            2,
            0
          ],
          "slotType": "large",
          "slotNum": 9,
          "slotsId": 85337,
          "__v": 0,
          "parking": "633c7219c20e80069dbf3e3c"
        }]
    }
]