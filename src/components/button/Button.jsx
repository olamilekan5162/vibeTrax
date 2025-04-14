import styles from "./Button.module.css";

const Button = ({ btnClass = "primary", text, onClick, disabled }) => {
  return (
    <button className={styles[btnClass]} onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
