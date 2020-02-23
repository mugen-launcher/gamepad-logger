import React, { useState, useEffect } from "react";
import useGamepad from "./useGamepad.hook";
import useKeyboard from "./useKeyboard.hook";

export default function App() {
  const gamepad = useGamepad();
  const keyboard = useKeyboard();
  const [buttons, setButtons] = useState(["Press any button"]);

  useEffect(() => {
    const onPressButton = event => {
      const message = `Gamepad: ${event.detail}`;
      setButtons([ ...buttons, message]);
    };
    const onPressKey = event => {
      const message = `Keyboard: ${event.detail}`;
      setButtons([ ...buttons, message]);
    };

    gamepad.addEventListener("button", onPressButton);
    keyboard.addEventListener("key", onPressKey);

    return () => {
      gamepad.removeEventListener("button", onPressButton);
      keyboard.removeEventListener("key", onPressKey);
    };
  }, [gamepad, keyboard, buttons]);

  return buttons.map(button => {
    return <p>{button}</p>
  });
}
