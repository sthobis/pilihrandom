import classes from "./MagicButton.module.css";

type MagicButtonProps = {
  onClick: (divineIntervention: boolean) => void;
  disabled: boolean;
};

function MagicButton({ onClick, disabled }: MagicButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const divineIntervention = x < rect.width / 2;
    onClick(divineIntervention);
  };

  return (
    <button
      type="button"
      className={classes.button}
      onClick={handleClick}
      disabled={disabled}
    >
      <div className={classes.text}>Spin</div>
    </button>
  );
}

export default MagicButton;
