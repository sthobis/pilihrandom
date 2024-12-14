import classes from "./App.module.css";
import MagicWheel from "./MagicWheel";
import MagicButton from "./MagicButton";
import { useMemo, useState } from "react";
import OptionsInput from "./OptionsInput";

const SPIN_DURATION = 5000;
const DEFAULT_TEXT = "Press spin to start";

let rotationOffset = 360 * 10;
let currentRotationOffset = 0;

function App() {
  const [state, setState] = useState<"idle" | "spinning" | "done">("idle");
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (value: string) => {
    setState("idle");
    setInputValue(value);
    setRotation(0);
  };

  const [statusText, setStatusText] = useState(DEFAULT_TEXT);

  const options = useMemo(() => {
    return inputValue
      .split(",")
      .map((option) => option.trim())
      .filter(Boolean);
  }, [inputValue]);

  const [rotation, setRotation] = useState(0);

  const spinTheWheel = (divineIntervention: boolean) => {
    setState("spinning");
    setStatusText("*drum roll*");
    const pickWinner = () => Math.floor(Math.random() * options.length);
    let winnerIndex = 0;
    if (divineIntervention) {
      while (winnerIndex === 0) {
        winnerIndex = pickWinner();
      }
    } else {
      winnerIndex = pickWinner();
    }
    const optionAngle = (360 / options.length) * -1;
    const winnerAngle =
      winnerIndex * optionAngle + optionAngle * (0.1 + Math.random() * 0.8);
    currentRotationOffset = currentRotationOffset + rotationOffset;
    setRotation(winnerAngle + currentRotationOffset);

    setTimeout(() => {
      setState("done");
      setStatusText(`Congratulations ${options[winnerIndex]}!`);
    }, SPIN_DURATION);
  };

  return (
    <div className={classes.app}>
      <MagicWheel
        options={options}
        rotation={rotation}
        spinning={state === "spinning"}
        duration={SPIN_DURATION}
      />
      <div className={classes.statusText}>{statusText}</div>
      <MagicButton
        onClick={spinTheWheel}
        disabled={inputValue.length === 0 || state === "spinning"}
      />
      <OptionsInput inputValue={inputValue} setInputValue={handleInputChange} />
    </div>
  );
}

export default App;
