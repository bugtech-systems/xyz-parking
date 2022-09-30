import styles from "./controls.module.scss";
import generateNumberPlate from "../../utils/number-plates-generator";

export const Controls = ({ loading }) => {

  return (
    <div className={styles.controls}>
      <button type="submit" className={`${styles.submitBtn} ${loading ? styles.disabledBtn : '' }`} disabled={loading} >PARK</button>
    </div>
  );
};
