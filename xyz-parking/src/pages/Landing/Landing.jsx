import { useState, useEffect } from 'react';
import styles from "./landing.module.scss";
import axios from 'axios';



const PARKING_SLOTS = 30;
const ENTRANCES = 10;




export const Landing = ({ triggerTransition, setParkingData, parkingData }) => {
  const [values, setValues] = useState({
    slots: 10,
    entrance: 3
  });
  const [merge, setMerge] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChanges = prop => event => {
        setValues({...values, [prop]: Number(event.target.value)});
  }




  const onSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    let errors = {};




    const parkingSize = Number(values.slots);
    const parkingEntrance = Number(values.entrance);
    if(parkingEntrance > ENTRANCES || parkingEntrance < 3){
      errors.entrance = 'Value dont fit minimum of 3 maximum of 10'
     }

     if( parkingSize > PARKING_SLOTS){
       errors.slots = 'Value reach maximum of 30'
      }

      if(Object.keys(errors).length > 0) {
        return setErrors(errors);
      } 






    if ((parkingSize && typeof parkingSize === "number") && (parkingEntrance && typeof parkingEntrance === "number")) {
      setParkingData(values);
    }

    axios.post('https://www.allinpaking.online/api/slots', {...values, merge})
    .then(({data}) => {
      localStorage.setItem("parkingData", JSON.stringify({...values, merge}));
      localStorage.setItem("slotsId", data.id);
       triggerTransition();
    })
    .catch(err => {
      console.log(err)
    })
    
  };


  useEffect(() => {
    setValues(parkingData)
  }, [parkingData])

  return (
    <div className={`flex ${styles.landing}`}>
      <section>
      <h2>Welcome to XYZ Corp Parking Lot Software.</h2>
      </section>
      <form onSubmit={onSubmit}>
      <div className={styles.sectionContainer}>
      
      <div>
      <header className={styles.title}>
          How many parking entrances you need?
        </header>
          <input
            placeholder={`Minimum of 3 maximum of 10 (3-${ENTRANCES})`}
            type="number"
            // max={10}
            // min={3}
            maxLength={2}
            value={values.entrance}
            onChange={handleChanges('entrance')}
            
          />

          {errors.entrance && (
            <p className={styles.errorMessage}>
             Entrance count should be between 3 and 10{" "}
              (including).
            </p>
          )}

        
      </div>
      <br/>
      <div className={styles.btnContainer}>
      <header className={styles.title}>
          How many parking slots you need?
        </header>
          <input
            placeholder={`Enter your desired size here (1-${PARKING_SLOTS})`}
            type="number"
            maxLength={2}
            value={values.slots}
            onChange={handleChanges('slots')}
          />
          {errors.slots && (
            <p className={styles.errorMessage}>
              Parking slots count should be between 1 and {PARKING_SLOTS}{" "}
              (including).
            </p>
          )}
      </div>
      <br/>
      <button type="submit" className={styles.submitBtn} >Submit</button>
      <div onClick={() => setMerge(true)} style={{width: '200px', height: '20px', opacity: 0}}>Merge</div>

      </div>
      </form>
    </div>
  );
};
