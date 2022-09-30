import styles from "./info-board.module.scss";

export const InfoBoard = ({ availableSlotsCount }) => {
  return (
    <div className={styles.infoBoard}>
      <h3>XYZ Parking Lot Software Corp.</h3>
      <div>
        Available slots: &nbsp;<span>{availableSlotsCount}</span>
      </div>
    </div>
  );
};
