import React from "react";
import styles from "./button.module.css";

interface Props {
  onClick: () => void;
  text?: string;
  children?: React.ReactNode;
}

function Button({ onClick, text, children }: Props) {
  if (text === undefined && children === undefined) {
    return <button className={styles.button} onClick={onClick} />;
  }

  if (text === undefined) {
    return (
      <button className={styles.button} onClick={onClick}>
        {children}
      </button>
    );
  }

  return (
    <button className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
