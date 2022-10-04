import { useState, useEffect } from 'react';
import styles from "./info-board.module.scss";
import generateNumberPlate from "../../utils/number-plates-generator";

import moment from 'moment';

import carUrl from "../../assets/car.png";
import carUrl1 from "../../assets/car1.png";
import mcarUrl from "../../assets/mcar.png";
import mcarUrl1 from "../../assets/mcar1.png";
import lcarUrl from "../../assets/lcar.png";
import lcarUrl1 from "../../assets/lcar1.png";
import { type } from '@testing-library/user-event/dist/type';

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

export const CarInfoBoard = ({ availableSlotsCount, handlePark, handleClose, type, data, handleUnpark}) => {
  const [values, setValues] = useState({entry: '', numberPlate: '', size: ''});
  const [imgUrl, setImgUrl] = useState(null);
  const [parkingData, setParkingData] = useState({ slots: 10,
    entrance: 3})
  const handleChanges = prop => event => {
    setValues({...values, [prop]: event.target.value});
}

const handleGenerate = () => {
    let np = generateNumberPlate();
    setValues({...values, numberPlate: np});
}


let vals =  localStorage.getItem('parkingData');

useEffect(() => {
  setParkingData(JSON.parse(vals ? vals : JSON.stringify({ slots: 10,
    entrance: 3})));
},[])

let entrance = Array.from(Array(parkingData.entrance).keys());
let imgs = data.img ? data.img : {};
let parking = data.parking ? { ...imgs, ...data.parking} : {};
let comp = data.computation ? data.computation : {};

  return (
    <>
    {type === 'info' ?
    <div className={`${styles.infoBoard} ${styles.mt50}`}>
      <span className={styles.closeBtn} onClick={handleClose}>x</span>
      <h3>PARKING DETAILS.</h3>
      <br/>
      <select
            placeholder={`Enter your desired size here (1-30)`}
            value={values.entry}
            onChange={(e) => setValues({...values, entry: e.target.value})}
          >
                <option className='optionTitle' value="">ENTRY POINTS</option>
             {entrance.map(a => {
              return (
                <option key={a} value={a}>Entrance - {a + 1}</option>
              )
             })}

            </select>
            <select
            placeholder={`Enter your desired size here (1-30)`}
            value={values.size}
            onChange={(e) => { 
              let img = cars.find(a => a.size === e.target.value);
              setValues({...values, size: e.target.value, imgFront: null, imgBack: null, size: '', ...img})
            }}
          >
              <option className='optionTitle' value="">VEHICLE SIZE</option>
             {cars.map(a => {
              return (
                <option key={a.size} value={a.size}>{String(a.size).toUpperCase()}</option>
              )
             })}

            </select>
            <input
            placeholder={`Vehicle Plate Number`}
            value={values.numberPlate}
            onChange={handleChanges('numberPlate')}
          />
          <span onClick={() => handleGenerate()} className={styles.generator}>Auto Generate</span>
        <br/>
     <div className={styles.carCard}>
     {values.imgFront && <img  src={values.imgFront} alt={`${String(values.size).toUpperCase()} CAR`} />
            }</div>
             <div className={styles.controls}>
      <button type="submit" onClick={() => handlePark(values)} className={`${styles.submitBtn} ${(!values.numberPlate || !values.entry || !values.size) ? styles.disabledBtn : '' }`} disabled={!values.numberPlate || !values.entry || !values.size} >PARK</button>
    </div>
            {/* <Controls loading={!values.numberPlate || !values.entry || !values.size}/> */}
            </div>
    : 
            <div className={`${styles.infoBoard} ${styles.mt30}`}>
      <span className={styles.closeBtn} onClick={handleClose}>x</span>
      <h3>PARKING DETAILS.</h3>
      <br/>
    <div className={styles.infoBodyCard}>
        <div className={styles.label}>PLATE NUMBER</div>
        <span className={styles.text}>{parking.numberPlate}</span>
    </div>
    <div className={styles.infoBodyCard}>
        <div className={styles.label}>Date Parked</div>
        <span className={`${styles.text} ${styles.textDate}`}>{moment(parking.parkedStart).format('lll')}</span>
    </div>
    <div className={styles.infoBodyCard}>
        <div className={styles.label}>Car Type</div>
        <span className={styles.text}>{`${String(parking.carType ? parking.carType : '').toUpperCase()}`}</span>
    </div>
    <div className={styles.infoBodyCard}>
        <div className={styles.label}>Slot Type & Rate</div>
        <span className={styles.text}>{`${String(data.slotType ? data.slotType : '').toUpperCase()}  | ${comp.rate}/hrs.`}</span>
    </div>
    <div className={styles.infoBodyCard}>
        <div className={styles.label}>Total Hours</div>
        <span className={styles.text}>{comp.hours}/hrs.</span>
        {/* <span className={styles.text}>{parking.hours}/hrs.</span> */}
    </div>
    <div className={styles.infoBodyCard}>
        <div className={styles.label}>Amount Due</div>
        <strong><span className={styles.text}>{new Intl.NumberFormat('en-US',
  { style:'currency', currency: 'PHP' }).format(comp.due)}</span></strong>
    </div>
    <br/>
            <div className={styles.carCard}>
     {data.imgFront &&  <img src={data.imgBack} alt={`${String(data.size).toUpperCase()} CAR`} />
            }</div>
            <br/>
     <div className={styles.controls}>
      <button className={` ${styles.backButton}`} onClick={(e) => handleUnpark(data)}>UNPARK</button>
    </div>
    </div>
    }
    </>
  );
};