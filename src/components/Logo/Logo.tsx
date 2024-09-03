import styles from "./Logo.module.css";
import { memo } from "react";

function Logo({ image }) {
  return (
    <>
      <img className={styles["logo"]} src={image} alt="Logo" />
      <div className={styles["logo__text"]}>Personal Journal</div>
    </>
  );
}

export default memo(Logo);
