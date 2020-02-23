import { useState, useEffect } from "react";

const emitter = new EventTarget();
let currentButtonStates = [];
function scanGamepads() {
  const gamepads = navigator.getGamepads();
  const nextButtonStates = Array.from(gamepads)
    .filter(gamepad => {
      if (gamepad) {
        return true;
      }
    })
    .map(gamepad => {
      return gamepad.buttons.map(button => {
        return button.pressed;
      });
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
  window.requestAnimationFrame(scanGamepads);
}
scanGamepads();

export default function useGamepads() {
  return emitter;
}
