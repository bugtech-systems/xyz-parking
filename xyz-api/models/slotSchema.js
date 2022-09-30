var mongoose=require('mongoose');
 
var SlotSchema = new mongoose.Schema({
    slotNum: Number,
    isBusy: {
        type: Boolean,
        default: false
    },
    nearestEntrance: [Number],
    slotType: {
        type: String, enum:["small","medium", "large"],
        default: "large"
    },
    slotsId: Number,
    parking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Parking"
    }
});
 
module.exports = mongoose.model('Slots', SlotSchema);