import classes from "./OptionsInput.module.css";

type OptionsInputProps = {
  inputValue: string;
  setInputValue: (value: string) => void;
  disabled: boolean;
};

function OptionsInput({
  inputValue,
  setInputValue,
  disabled,
}: OptionsInputProps) {
  return (
    <textarea
      className={classes.textarea}
      rows={4}
      placeholder="Enter options separated by commas"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      disabled={disabled}
    />
  );
}

export default OptionsInput;
