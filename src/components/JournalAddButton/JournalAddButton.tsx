import CardButton from "../CardButton/CardButton";
import styles from "./JournalAddButton.module.css";

function JournalAddButton({ clearForm }) {
  return (
    <CardButton onClick={clearForm} className={styles["journal-add"]}>
      + Новое воспоминание
    </CardButton>
  );
}

export default JournalAddButton;
