import { useState, useEffect } from "react";
import { Car } from "../../components/Car";

import styles from "./main.module.scss";
import { ParkingSlot } from "../../components/ParkingSlot";
import { Controls } from "../../components/Controls";
import ParkingLot from "../../lib/parking-lot";
import { InfoBoard } from "../../components/InfoBoard/InfoBoard";
import { CarInfoBoard } from "../../components/CarInfoBoard/CarInfoBoard";


import axios from 'axios';


import carUrl from "../../assets/car.png";
import carUrl1 from "../../assets/car1.png";
import mcarUrl from "../../assets/mcar.png";
import mcarUrl1 from "../../assets/mcar1.png";
import lcarUrl from "../../assets/lcar.png";
import lcarUrl1 from "../../assets/lcar1.png";
import { SlotInfoBoard } from "../../components/SlotInfoBoard";

let cars = [
  { size: 'small',
    imgFront: carUrl,
    imgBack: carUrl1 
  },
  { size: 'medium',
  imgFront: mcarUrl,
  imgBack: mcarUrl1 
},
{ size: 'large',
imgFront: lcarUrl,
imgBack: lcarUrl1 
}
]




const ROW_LIMIT = 5;

export const Main = ({ parkingData }) => {
  const [slotsData, setSlotsData] = useState([]);
 
  const [parkingLot, setParkingLot] = useState(new ParkingLot({slots: [], data: {}}));
  const [availableSlots, setAvailableSlots] = useState(0);
  const [rows, setRows] = useState([]);
  const [carAnimation, setCarAnimation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [carDir, setCarDir] = useState('in');
  const [cardDisplay, setCardDisplay] = useState({});
  const [cardOpen, setCardOpen] = useState(false);
  const [cardType, setCardType] = useState('info');
  const [message, setMessage] = useState(null)
  let slotsId = localStorage.getItem('slotsId');


  // useEffect(() => {
  //   setParkingLot(new ParkingLot(parkingData.slots));
  //   // setAvailableSlots(parkingData.slots);
  // }, [parkingData.slots]);


  const handleClose = () => {

    setCardOpen(false)
    setCardDisplay({});
    setCardType('info')


  }
  const getAllSlots = () => {
        parkingLot.getAllSlots(slotsId)
        .then(a => {
          setParkingLot(new ParkingLot({slots: a, data: parkingData}));
          setSlotsData(a)
          setAvailableSlots(a.filter((s) => !s.isBusy).length);
        })
        .catch(err => {
          setParkingLot(new ParkingLot({slots: [], data: parkingData}));
          setSlotsData([])
          setAvailableSlots(0);
        })
  }


  const handlePark = async (vals) => {

    
    
    if(availableSlots === 0) return console.log('OVER LOADED!') 
 
  
    
    if (parkingLot.isFull()) {
      // setInfoBoardVisible(true);
      return;
    }
   
    let park = await parkingLot.park(vals);

    if(!park.message){
        setCardOpen(false);
          setCarDir('in')
      setCarAnimation((state) => true);
  
      setCardDisplay(vals)
      getAllSlots(slotsId)

      setTimeout(() => {
          setAvailableSlots(parkingLot.getAvailable());
          setCarAnimation((state) => false);
          setLoading(false)
          setCardDisplay({});

      }, 500)
      setMessage(null)
    } else {
        setMessage(park.message);
      setAvailableSlots(parkingLot.getAvailable());
      setCarAnimation((state) => false);
      setLoading(false)
      setCardDisplay({});
    }
  
  }



  useEffect(() => {
    let id = localStorage.getItem('slotsId');
    if(id){
      getAllSlots()
    }
  }, [])

  useEffect(() => {


    function distributeSlotsToRows() {
      let rowsCount = Math.ceil(slotsData.length / ROW_LIMIT);
      let slotsCount = slotsData.length;

      const rows = [];
      let row = [];


      while (parkingData.slots > 0 && rowsCount > 0) {
        // It's important first to decrement the count of the slots otherwise we will miss one
        slotsCount--;

        const slot = parkingLot?.slots[slotsCount];
        let slotObj = slotsData.find(a => a.slotNum === slotsCount);

        if(slotObj){
          row.push(slotObj);
        }

      

        if (slotsCount % ROW_LIMIT === 0) {
          rowsCount--;
          rows.push(row);
          row = [];
        }
      }
      setRows(rows);
    }

    distributeSlotsToRows();
  }, [slotsData, availableSlots]);

  const handleUnpark = (vals) => {

    let { _id, parking } = vals;
    setLoading(true)
    setCardOpen(false);
    setCardType('info')

    if(availableSlots === parkingData.slots) return console.log('NO PARKED CAR!') 
    if(!parking) return console.log('NO PARKED CAR!') 

    setCardDisplay(vals)
 

    if (parking) {
      setCarDir('out')
      setCarAnimation((state) => true);
    } else{
      setCarAnimation((state) => false);
      return console.log('NO PARKED CAR!') 
    }
    
      parkingLot.remove(_id).then(() => {
        getAllSlots(slotsId)
  
        setTimeout(() => {
            setAvailableSlots(parkingLot.getAvailable());
          // if(carAnimation){
            setCarAnimation((state) => false);
            setCardDisplay({});
          // }
          setLoading(false)
        }, 500)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  

  };

  const handleShowSummary = (vals) => {
    if(vals.isBusy){
    let {parking } = vals;
    let computation = parkingLot.compute(parking);
    let img = cars.find(a => a.size === parking.carType);
    setCardDisplay({ ...img, ...vals, computation})
    setCardOpen(true);
    setCardType('summary')
    } else {

      setCardDisplay({...vals, entrances: Array.from(Array(parkingData.entrance).keys())})
      setCardOpen(true);
      setCardType('config')
    }
   
  };

  const handleUpdateSlot = (vals) => {
    parkingLot.update(vals._id, vals)
    .then(() => {
      getAllSlots()
      setTimeout(() => {
          setAvailableSlots(parkingLot.getAvailable());
          setCarAnimation((state) => false);
          setLoading(false)
          handleClose();
        }, 500)
    })
    .catch(err => {
      console.log(err)
    })
  };


  return (
    <>
     <section className={styles.dashboard}>
        {/* {availableSlots !== 0 && <Controls add={handleAddToParking} 
        
        getInfo={handleGetInfo} loading={loading} />} */}
        <div className={styles.main}>
      {cardOpen ? cardType !== 'config' ?
     <CarInfoBoard type={cardType} availableSlotsCount={availableSlots} handlePark={handlePark} handleUnpark={handleUnpark} handleClose={() => handleClose()} data={cardDisplay}/>
     : 
     <SlotInfoBoard handleUpdate={handleUpdateSlot} handleClose={() => handleClose()} data={cardDisplay}/>
     : !carAnimation &&<button type="submit" onClick={() => { setCardOpen(true); setCardType('info'); setCardDisplay({}) }} className={styles.submitBtn} >ENTER VEHICLE</button>
    }      
    </div>
   <Car animationState={carAnimation} type={carDir} car={cardDisplay} show={!cardOpen && cardDisplay.size}/>

      </section>
      <section >
      <InfoBoard availableSlotsCount={availableSlots} />
      <div className={styles.main}>
        {rows.map((row, idx) => (
          <div key={row + idx} className={styles.row}>
            {row.map((a, index) => (
              <ParkingSlot
                remove={handleShowSummary}
                key={index + idx}
                data={a} 
                loading={loading}
               
              />
            ))}
          </div>
        ))}
        </div>
        {!message ? <div className={styles.footerNote}>
      Click on a parking slot to unpark the car or configure slot.
        </div> 
        :
        <div className={styles.footerNoteErr}>
        {message}
          </div> 
           }
      </section>
     
     
    </>
  );
};
