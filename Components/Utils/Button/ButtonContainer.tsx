import React from "react";
import styles from "./button.module.css";
interface Props {
  children: React.ReactNode;
  loading?: boolean;
}

function ButtonContainer({ children, loading }: Props) {
  if (loading) {
    return <div className={styles.buttonContainer}></div>;
  }

  return <div className={styles.buttonContainer}>{children}</div>;
}

export default ButtonContainer;
