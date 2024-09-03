import { useCallback, useState } from "react";
import Button from "../Button/Button";
import Logo from "../Logo/Logo";
import SelectUser from "../SelectUser/SelectUser";
import styles from "./Header.module.css";

const logos = ["/vite.svg", "/react.svg"];

function Header() {
  const [logoIndex, setLogoIndex] = useState(0)

  const toggleLogo = useCallback(() => {
    setLogoIndex(state => Number(!state))
  }, [])

  return (
    <>
      <Logo image={logos[logoIndex]}/>
      <Button onClick={toggleLogo}>Изменить лого</Button>
      <SelectUser/>
    </>
  );
}

export default Header;
