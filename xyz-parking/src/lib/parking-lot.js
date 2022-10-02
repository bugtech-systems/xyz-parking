import axios from 'axios';
import moment from 'moment';

function compareNearestIndex(a, b) {
  return a.nearestIndex - b.nearestIndex;
}

let rates = [
  {name: 'small', rate: 20},
  {name: 'medium', rate: 60},
  {name: 'large', rate: 100},
]

class ParkingLot {
  slots = [];
  parkingData = {};

  constructor(parkingData) {
    this.slots = parkingData.slots;
    this.parkingData = parkingData.data;
  }

  park(vals) {
    let { size, entry} = vals;
    let sizeOption = size === 'large' ? ['large'] : size === 'medium' ? ['medium', 'large'] : size === 'small' ? ['small', 'medium', 'large'] : [];
    let prioritySlots = [];
    let prioritySizes = [];
    if (this.slots.every((slot) => slot.isBusy !== false)) {
      return false;
    }

    //Map slots and return nearest entrance attribute.
    let mappedData = this.slots.map(a => {
        let ind = a.nearestEntrance.indexOf(Number(entry));
      return {...a, nearestIndex: ind}
    }).filter(a => !a.isBusy);


    // let sortData = mappedData.sort(compareNearestIndex);


    //Filter All Slots By Nearest from entered entrance.
    // let nearer = this.slots.filter(a => a.nearestEntrance())


    //Filter By Slots Size constraint.
    for(let sz of sizeOption){


    let fltrSize = mappedData.filter(a => {
         return a.slotType === sz;
    });



    let nearestSize = mappedData.filter(a => {
      return  (a.slotType === sz || a.nearestIndex === entry);
 });


    prioritySlots = [...prioritySlots, ...nearestSize];
    prioritySizes = [...prioritySizes, ...fltrSize];

  }

  
  console.log('FLLTTE')
  console.log(prioritySizes)



    //Get First Value on the Array.
    let sortedSlots = prioritySlots.sort(compareNearestIndex);
    let slot = sortedSlots[0];


    if (!slot) {
      console.log('No Slot Available!')
      return {message: 'No Slot Available!'};
    } else {



    vals.slot = slot;
    vals.parkedStart = new Date;
    vals.slotType = slot.slotType;
    vals.carType = size;


    // for (let i = 0; i <= this.slots.length; i++) {
    //   const slot = this.slots[i];



    //   if (slot === null) {
    //     this.slots[i] = carId;
    //     return true;
    //   }
    // }
    return  axios.post(`http://localhost:4000/park`, vals)
    .then(({data}) => {
        return data
    })
    .catch(err => {
      console.log(err)
      return err.response.data;
    })
  }

    // return dta
  }


  remove(_id) {
    console.log(`Leaving car: ${_id}`);
    if (this.slots.every((slot) => slot._id !== _id)) {
      return false;
    }


    return axios.get(`http://localhost:4000/unpark/${_id}`)
    .then(({data}) => {
        return data
    })
    .catch(err => {
      console.log(err)
      return err
    })
  }

  update(_id, data) {
    console.log(`Updating slot: ${_id}`);
    if (!_id || !data) {
      return false;
    }


    return axios.put(`http://localhost:4000/slot/${_id}`, data)
    .then(({data}) => {
        return data
    })
    .catch(err => {
      console.log(err)
      return err
    })
  }

  compute(vals = {}) {
    let start = moment(vals.parkedStart);
    let rt = rates.find(a => a.name === vals.slotType)
    let due = 0;
   let hrs = moment().diff(start, 'hours');

    if(hrs < 3){
      due = 40;
    }

    if(hrs >= 24){
      let d = Math.floor(hrs / 24);
      let td = d * 24;
      let exc = hrs - td;
      let ttd = 5000 * d;
      let th = exc * Number(rt.rate);
      due = ttd + th + 40;
    }

    if(hrs < 24 && hrs > 3){
      let th = hrs * Number(rt.rate);
      due = th;
    }



    return {
      hours: hrs,
      due,
      type: vals.slotType,
      rate: rt.rate
    };
  }


  getSlots() {
    console.log(`Parking slots: ${this.slots}`);
    return this.slots;
  }

  getSize() {
    console.log(`Parking size is: ${this.slots.length}`);
    return this.slots.length;
  }

  getAvailable() {
    const availableSlots = this.slots.filter((s) => !s.isBusy).length;
    console.log(`Available parking slots: ${availableSlots}`);
    return availableSlots;
  }

  isFull() {
    return this.getAvailable() === 0;
  }

  getAllSlots (id){
    return axios.get(`http://localhost:4000/slots/${id}`)
    .then(({data}) => {
        this.slots = data;
        return data
    })
    .catch(err => {
      return []
    })
  }

}

export default ParkingLot;
