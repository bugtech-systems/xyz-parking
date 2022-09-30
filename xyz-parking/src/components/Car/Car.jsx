import { CSSTransition } from "react-transition-group";


import "./car.css";

export const Car = ({ animationState, type, car, show }) => {


  const imgUrl = type === 'in' ? car.imgFront : car.imgBack;
  let  carStyle = type === 'in' ? 'car-front' : 'car-back';
  return (
    <div className="car-container">
      {/* {car.name &&  */}0
      <CSSTransition
        unmountOnExit
        in={!animationState}
        // in={(type === 'in' || type === 'out') && animationState ? true : false}

        timeout={500}
        classNames="fade"
      >
        <div className="button-container">
          <img className={`${carStyle} ${!show ? 'hidden' : ''}`} src={imgUrl} alt={`${String(car.size).toUpperCase()} CAR`}  />
        </div>
      </CSSTransition>
{/* } */}
     {/* <CSSTransition
        unmountOnExit
        in={animationState}
        timeout={300}
        classNames="fade"
      >
        <div className="button-container">
          <img className="car1" src={carUrl} alt="Car" />
        </div>
      </CSSTransition> */}
    </div>
  );
};
