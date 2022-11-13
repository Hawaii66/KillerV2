import React from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import styles from "./admin.module.css";

interface Props {
  randomise: () => void;
  turn: () => void;
  download: () => void;
}

function KillerActions({ randomise, turn, download }: Props) {
  const newCircle = () => {
    const answer = prompt(
      "Är du säker på att du vill starta om cirkeln och skicka ut nya sms?\nIsåfall skriv\n\nstarta om"
    );
    if (answer !== null && answer === "starta om") {
      randomise();
    }
  };

  const turnCircel = () => {
    const answer = prompt(
      "Är du säker på att du vill vänd cirkeln så att ditt offer blir din mördare? Detta tar ungefär 2 minuter att göra\nIsåfall skriv\n\nvänd"
    );
    if (answer !== null && answer === "vänd") {
      turn();
    }
  };

  return (
    <div className={styles.spacer}>
      <ButtonGroup aria-label="Basic example">
        <Button variant="danger" onClick={newCircle}>
          Slumpa Ordning
        </Button>
        <Button variant="warning" onClick={turnCircel}>
          Vänd Cirkel
        </Button>
        <Button variant="info" onClick={download}>
          Ladda Ner
        </Button>
      </ButtonGroup>
    </div>
  );
}

export default KillerActions;
