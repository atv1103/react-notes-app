import { useContext, useMemo } from "react";
import CardButton from "../CardButton/CardButton";
import JournalItem from "../JournalItem/JournalItem";
import { UserContext } from "../../context/user.context";

function JournalList({ items, setItem }) {
  const { userId } = useContext(UserContext);

  const sortItems = (a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  };

  const filteredItems = useMemo(
    () => items.filter((el) => el.userId === userId).sort(sortItems),
    [items, userId]
  );

  if (!items.length) {
    return <p>Записей пока нет, добавьте первую</p>;
  }

  return (
    <>
      {filteredItems.map((el) => (
        // @ts-ignore
        <CardButton onClick={() => setItem(el)} key={el.id}>
          <JournalItem title={el.title} text={el.post} date={el.date} />
        </CardButton>
      ))}
    </>
  );
}

export default JournalList;
