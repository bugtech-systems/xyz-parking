import React, { useState, useCallback, useEffect } from "react";
import { useTransition, animated, useSpringRef } from "@react-spring/web";

import styles from "./styles.module.scss";
import { Landing } from "./pages/Landing";
import { Main } from "./pages/Main";

const pages = [
  ({ style, triggerTransition, setParkingData, parkingData }) => (
    <animated.div style={{ ...style, background: "lightgreen" }}>
      <Landing
        triggerTransition={triggerTransition}
        setParkingData={setParkingData}
        parkingData={parkingData}
      />
    </animated.div>
  ),
  ({ style, parkingData }) => (
    <animated.div style={{ ...style, background: "lightgray" }}>
      <Main parkingData={parkingData} />
    </animated.div>
  ),
];

export default function App() {
  const [values, setValues] = useState({
    slots: 10,
    entrance: 3
  })

  const [index, set] = useState(0);
  const onClick = useCallback(() => set((state) => (state + 1) % 2), []);
  const transRef = useSpringRef();
  const transitions = useTransition(index, {
    ref: transRef,
    keys: null,
    from: { opacity: 0, transform: "translate3d(100%,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0%,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-50%,0,0)" },
  });


  const handleReset = () => {
    localStorage.clear();
    window.location.href="/"
  }


  useEffect(() => {
    transRef.start();
  }, [index]);


  let vals =  localStorage.getItem('parkingData');

  useEffect(() => {
    setValues(JSON.parse(vals ? vals : JSON.stringify({ slots: 10,
      entrance: 3})));
    if(vals){
    set(1)
    }
  },[])

  return (
    <>
  {vals &&  <span className={styles.backButton} onClick={() => handleReset()}>{`RESTART`}</span>}
    <div className={`flex fill ${styles.container}`}>
   
      {transitions((style, i) => {
        const Page = pages[i];
        return (
          <Page
            style={style}
            triggerTransition={onClick}
            parkingData={values}
            setParkingData={setValues}
          />
        );
      })}
    </div>
    </>

  );
}
