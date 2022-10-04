var mongoose=require('mongoose');
 

var ParkingSchema = new mongoose.Schema({
    numberPlate: String,
    slotType: {
        type: String, enum:["small","medium", "large"]
    },
    carType: {
        type: String, enum:["small","medium", "large"]
    },
    parkedStart: {
        type : Date 
    },
    parkedEnd: {
        type : Date 
    },
    slot: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Slot"
    }
});
 
module.exports = mongoose.model('Parking', ParkingSchema);