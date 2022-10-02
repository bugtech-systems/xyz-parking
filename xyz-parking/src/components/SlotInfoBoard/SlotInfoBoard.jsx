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

export const SlotInfoBoard = ({ handleUpdate, handleClose, data}) => {
  const [values, setValues] = useState({nearestEntrance: [], slotNum: '', slotType: 'small', entrances: [], entrance: 0});

  const handleChanges = prop => event => {
    setValues({...values, [prop]: event.target.value});
}

const handleRemove = (id) => {
  let arr = values.nearestEntrance;

  const index = arr.indexOf(id);
  if (index > -1) { // only splice array when item is found
    arr.splice(index, 1); // 2nd parameter means remove one item only
  }
    setValues({...values, nearestEntrance: arr});
}

useEffect(() => {
  if(data.slotType){
    let img = cars.find(a => a.size === data.slotType);
    setValues({...data, imgFront: null, imgBack: null, size: '', ...img});
  } else {
    setValues(data)
  }

},[data])


// let nearest = 


 let disable = (!values.slotNum || values.nearestEntrance.length === 0 || !values.slotType)

  return (
    <>
    <div className={`${styles.infoBoard} ${styles.mt50}`}>
      <span className={styles.closeBtn} onClick={handleClose}>x</span>
      <h3>SLOT DETAILS.</h3>
      <br/>
      <span className={styles.textLabel} >Slot Size</span>
      <select
            placeholder={`Select Slot Size.`}
            value={values.slotType}
            onChange={(e) => { 
              let img = cars.find(a => a.size === e.target.value);
              setValues({...values, slotType: e.target.value, imgFront: null, imgBack: null, size: '', ...img})
            }}
          >
              <option className='optionTitle' value="">Select Slot Size</option>
             {cars.map(a => {
              return (
                <option key={a.size} value={a.size}>{String(a.size).toUpperCase()}</option>
              )
             })}

            </select>
            <span className={styles.textLabel} >Entry Points</span>
      <select
            placeholder={`Select and Order by nearest entrance.`}
            value={values.entrance}
            onChange={(e) => {
              let val = Number(e.target.value)
              let ind = values.nearestEntrance.indexOf(val);

              if(ind === -1 && (val + 1)){
                let entrns = values.nearestEntrance;
                entrns.push(val)
                setValues({...values, nearestEntrance: entrns})
              }
              } 
            }
          >
                <option className='optionTitle' value={null}>ENTRY POINTS (Select in order)</option>
             {values.entrances.map(a => {
              return (
                <option key={a} value={a}>Entrance - {a + 1}</option>
              )
             })}

            </select>

            
            <div className={styles.infoBodyCard}>
        <div className={styles.label}>ORDER OF NEAREST ENTRANCE</div>
        <br/>
        
    </div>
    <div className={styles.entrances}>
    {/* <span className={styles.nf}>Near</span> */}
    <div className={styles.cardContainer}>
{/* {nearest} */}
{values.nearestEntrance.map(a =>
  <div key={a} className={styles.card} onClick={() => handleRemove(a)}>
    <div className={styles.closeBtn}>x</div>
    {Number(a) + 1}
    </div>
 )}

</div>
{/* <span className={styles.nf}>Far</span> */}
{values.nearestEntrance.length !== 0 &&
<span className={styles.text} onClick={() => setValues({...values, nearestEntrance: []})}>Clear</span>}

          </div>
        <br/>
     <div className={styles.carCard}>
     {values.imgFront && <img  src={values.imgFront} alt={`${String(values.slotType).toUpperCase()} CAR`} />
            }</div>
             <div className={styles.controls}>
      <button type="submit" onClick={() => handleUpdate(values)} className={`${styles.submitBtn} ${disable ? styles.disabledBtn : '' }`} disabled={disable} >UPDATE</button>
    </div>
            </div>
    </>
  );
};