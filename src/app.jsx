import React, { useReducer } from "react";
import useGamepad from "./useGamepad.hook";

export default function App() {
  const gamepad = useGamepad();
  const [lastButton, setLastButton] = useState("");

  useEffect(() => {
    const onPress = event => {
      setLastButton(event.detail);
    };

    gamepad.addEventListener("button", onPress);

    return () => {
      gamepad.removeEventListener("button", onPress);
    };
  }, [gamepad]);

  return (
    <p>{lastButton}</p>
  );
}
