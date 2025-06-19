import { forwardRef } from "react";
import styles from "./Input.module.css";
import cn from "classnames";

// @ts-ignore
const Input = forwardRef(function Input({ className, isValid = true, appearence, ...props }, ref) {
  return (
    <input
      {...props}
      // @ts-ignore
      ref={ref}
      className={cn(className, styles["input"], {
        [styles["invalid"]]: !isValid,
        [styles["input-title"]]: appearence === "title",
      })}
      // className={`${styles["input"]} ${formValidState.title ? "" : styles["invalid"]}`}
    />
  );
})

export default Input;
