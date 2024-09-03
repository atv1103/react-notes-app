import { useContext, useEffect, useReducer, useRef } from "react";
import styles from "./JournalForm.module.css";
import Button from "../Button/Button";
import { INITIAL_STATE, formReducer } from "./JournalForm.state";
import cn from "classnames";
import Input from "../Input/Input";
import { UserContext } from "../../context/user.context";

function JournalForm({ onSubmit, data, onDelete }) {
  const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
  const { isValid, isFormReadyToSubmit, values } = formState;
  const titleRef = useRef();
  const dateRef = useRef();
  const postRef = useRef();
  const { userId } = useContext(UserContext);

  useEffect(() => {
    if(!data) {
      dispatchForm({ type: "CLEAR_FIELDS" });
      dispatchForm({
        type: "SET_VALUE",
        payload: { userId },
      });
    }
    dispatchForm({
      type: "SET_VALUE",
      payload: { ...data },
    });
  }, [data]);

  useEffect(() => {
    let timerId;
    if (!isValid.title || !isValid.post || !isValid.date) {
      focusError(isValid);
      timerId = setTimeout(() => {
        dispatchForm({ type: "RESET_VALIDITY" });
      }, 1000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [isValid]);

  useEffect(() => {
    if (isFormReadyToSubmit) {
      onSubmit(values);
      dispatchForm({ type: "CLEAR_FIELDS" });
      dispatchForm({
        type: "SET_VALUE",
        payload: { userId },
      });
    }
    // }, [isFormReadyToSubmit, values, onSubmit]);
  }, [isFormReadyToSubmit, userId]);
  // }, [isFormReadyToSubmit]);

  useEffect(() => {
    dispatchForm({
      type: "SET_VALUE",
      payload: { userId },
    });
  }, [userId]);

  const focusError = (isValid) => {
    switch (true) {
      case !isValid.title:
        titleRef.current.focus();
        break;
      case !isValid.date:
        dateRef.current.focus();
        break;
      case !isValid.post:
        postRef.current.focus();
        break;
    }
  };

  const onChange = (e) => {
    dispatchForm({
      type: "SET_VALUE",
      payload: { [e.target.name]: e.target.value },
    });
  };

  const addJournalItem = (e) => {
    e.preventDefault();
    dispatchForm({ type: "SUBMIT" });
  };

  const deleteJournalItem = () => {
    onDelete(data.id)
    dispatchForm({ type: "CLEAR_FIELDS" });
    dispatchForm({
      type: "SET_VALUE",
      payload: { userId },
    });
  }

  return (
    // <UserContext.Consumer>
    //   {(context) => (
    <form className={styles["journal-form"]} onSubmit={addJournalItem}>
      {/* {context.userId} */}
      {/* {userId} */}
      <div className={styles["form-row"]}>
        <Input
          type="text"
          name="title"
          id="title"
          value={values.title}
          onChange={onChange}
          ref={titleRef}
          appearence="title"
          isValid={isValid.title}
        />
        {data?.id && <button className={styles['delete']} type="button" onClick={() => deleteJournalItem()}>
          <img src="/icon/archive.svg" alt="delete button"/>
        </button>}
      </div>
      <div className={styles["form-row"]}>
        <label htmlFor="date" className={styles["form-label"]}>
          <img
            className={styles["icon"]}
            src="/icon/calendar.svg"
            alt="calendar icon"
          />
          <span>Дата</span>
        </label>
        <Input
          type="date"
          name="date"
          id="date"
          value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ''}
          onChange={onChange}
          ref={dateRef}
          isValid={isValid.date}
        />
      </div>
      <div className={styles["form-row"]}>
        <label htmlFor="tag" className={styles["form-label"]}>
          <img
            className={styles["icon"]}
            src="/icon/folder.svg"
            alt="forlder icon"
          />
          <span>Метки</span>
        </label>
        <Input
          type="text"
          name="tag"
          id="tag"
          value={values.tag}
          onChange={onChange}
        />
      </div>
      <textarea
        className={cn(styles["input"], {
          [styles["invalid"]]: !isValid.post,
        })}
        name="post"
        id=""
        cols="30"
        rows="10"
        value={values.post}
        onChange={onChange}
        ref={postRef}
      ></textarea>
      <Button>Сохранить</Button>
    </form>
    // )}
    // </UserContext.Consumer>
  );
}

export default JournalForm;
