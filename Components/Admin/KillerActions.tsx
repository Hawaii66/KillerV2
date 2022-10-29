import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import styles from "./admin.module.css";

interface Props {
  randomise: () => void;
}

function KillerActions({ randomise }: Props) {
  const newCircle = () => {
    const answer = confirm(
      "Är du säker på att du vill starta om cirkeln och skicka ut nya sms?"
    );
    if (answer) {
      randomise();
    }
  };

  return (
    <div className={styles.spacer}>
      <ButtonGroup aria-label="Basic example">
        <Button variant="danger" onClick={newCircle}>
          Slumpa Ordning
        </Button>
        <Button variant="secondary">Skicka SMS</Button>
      </ButtonGroup>
    </div>
  );
}

export default KillerActions;