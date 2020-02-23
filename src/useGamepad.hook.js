import { useEffect } from "react";

export default function useGamepads() {
  const emitter = new EventTarget();

  useEffect(() => {
    let currentButtonStates = [];
    const scanGamepads = () => {
      try {
        const gamepads = navigator.getGamepads();
        const nextButtonStates = Array.from(gamepads)
          .filter(gamepad => {
            if (gamepad) {
              return true;
            }
          })
          .map(gamepad => {
            const buttons = gamepad.buttons.map(button => {
              return button.pressed;
            });
            if (Array.isArray(gamepad.axes)) {
              for (const axe of gamepad.axes) {
                const value = Math.round(axe);
                buttons.push(value === -1);
                buttons.push(value === 1);
              }
            }
            return buttons;
          });
    
        nextButtonStates.forEach((buttons, gamepadIndex) => {
          buttons.forEach((buttonPressed, buttonIndex) => {
            if (!buttonPressed) {
              return;
            }
            if (!currentButtonStates[gamepadIndex] || !currentButtonStates[gamepadIndex][buttonIndex]) {
              emitter.dispatchEvent(new CustomEvent("button", { detail: `${gamepadIndex}-${buttonIndex}`}));
            }
          });
        });
    
        currentButtonStates = nextButtonStates;
      } catch (error) {
        console.error(error);
      }
      window.requestAnimationFrame(scanGamepads);
    }
    scanGamepads();
  }, [emitter]);

  return emitter;
}
