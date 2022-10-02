import styles from "./parking-slot.module.scss";

export const ParkingSlot = ({data, remove, loading}) => {
  let { num, nearestEntrance, slotType, isBusy, parking, _id } = data;


  let bgColor = slotType === 'small' ? styles.busyS : slotType === 'medium' ? styles.busyM : slotType === 'large' ? styles.busyL : '';
  let numberPlate = parking ? parking.numberPlate : '';
  return (
    <div
      className={`${styles.parkingSlot}  ${bgColor} ${!isBusy ? styles.inactive : styles.active}`}
      onClick={() => remove(data)}
    >
      {isBusy ? numberPlate  : <div className={styles.slotCard}><div>{`Entance-${String(nearestEntrance[0] + 1).toUpperCase()}`}</div><div>{`${String(slotType).toUpperCase()}`}</div></div>}
    </div>
  );
};
