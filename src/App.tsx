import "./App.css";
import Header from "./components/Header/Header";
// import CardButton from "./components/CardButton/CardButton";
// import JournalItem from "./components/JournalItem/JournalItem";
import Body from "./layouts/Body/Body";
import LeftPanel from "./layouts/LeftPanel/LeftPanel";
import JournalList from "./components/JournalList/JournalList";
import JournalAddButton from "./components/JournalAddButton/JournalAddButton";
import JournalForm from "./components/JournalForm/JournalForm";
// import { useEffect, useState } from "react";
import { useLocalStorage } from "./hooks/use-localstorage.hook";
import { useState } from "react";
// import { UserContext } from "./context/user.context";
import { UserContextProvider } from "./context/user.context";

// const INITIAL_DATA = [
//   {
//     id: 1,
//     title: "Подготовка к обновлению курсов",
//     text: "Горные походы открывают удивительные природные ландшафты",
//     date: new Date(),
//   },
//   {
//     id: 2,
//     title: "Поход в горы",
//     text: "Различают альпинизм и горный туризм",
//     date: new Date(),
//   },
// ];

function mapItems(items) {
  if (!items) {
    return [];
  }
  return items.map((i) => ({
    ...i,
    date: new Date(i.date),
  }));
}

function App() {
  const [items, setItems] = useLocalStorage("data");
  const [selectedItem, setSelectedItem] = useState(null);

  const addItem = (item) => {
    if (!item.id) {
      setItems([
        ...mapItems(items),
        {
          // post: item.post,
          // title: item.title,
          ...item,
          date: new Date(item.date),
          id: items?.length ? Math.max(...items.map((i) => i.id)) + 1 : 1,
        },
      ]);
    } else {
      setItems([
        ...mapItems(items).map((i) => {
          if (i.id === item.id) {
            return { ...item };
          }
          return i;
        }),
      ]);
    }
  };

  const deleteItem = (id) => {
    setItems([...items.filter((i) => i.id !== id)]);
  };
  // const [items, setItems] = useState([]);

  // useEffect(() => {
  //   const data = JSON.parse(localStorage.getItem("data"));
  //   if (data) {
  //     setItems(
  //       data.map((item) => ({
  //         ...item,
  //         date: new Date(item.date),
  //       }))
  //     );
  //   }
  // }, []);

  // useEffect(() => {
  //   if (items.length) {
  //     localStorage.setItem("data", JSON.stringify(items));
  //   }
  // }, [items]);

  // const addItem = (item) => {
  //   // setItems((oldItems) => [...oldItems, item]);
  //   setItems((oldItems) => [
  //     ...oldItems,
  //     {
  //       post: item.post,
  //       title: item.title,
  //       date: new Date(item.date),
  //       id: Math.max(...oldItems.map((i) => i.id)) + 1,
  //     },
  //   ]);
  // };

  return (
    // <UserContext.Provider value={{ userId, setUserId }}>
    <UserContextProvider>
      <div className="app">
        <LeftPanel>
          <Header />
          <JournalAddButton
            clearForm={() => {
              setSelectedItem(null);
            }}
          />
          {/* <JournalList>
          {!items.length && <p>Записей пока нет, добавьте первую</p>}
          {items.length > 0 &&
            items.sort(sortItems).map((el) => (
              <CardButton key={el.id}>
                <JournalItem title={el.title} text={el.text} date={el.date} />
              </CardButton>
            ))}
        </JournalList> */}
          <JournalList items={mapItems(items)} setItem={setSelectedItem} />
          {/* <JournalList items={items} /> */}
        </LeftPanel>
        <Body>
          <JournalForm
            onSubmit={addItem}
            onDelete={deleteItem}
            data={selectedItem}
          />
        </Body>
      </div>
      {/* </UserContext.Provider> */}
    </UserContextProvider>
  );
}

export default App;
