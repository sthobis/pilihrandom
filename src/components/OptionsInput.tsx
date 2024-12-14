import classes from "./OptionsInput.module.css";

type OptionsInputProps = {
  inputValue: string;
  setInputValue: (value: string) => void;
};

function OptionsInput({ inputValue, setInputValue }: OptionsInputProps) {
  return (
    <textarea
      className={classes.textarea}
      rows={4}
      placeholder="Enter options separated by commas"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    />
  );
}

export default OptionsInput;
