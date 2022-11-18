import React from "react";
import { Button, Form } from "react-bootstrap";
import styles from "../../Components/Admin/admin.module.css";
import { Circle } from "../../Interfaces/Interfaces";

interface Props {
  setSortMode: (s: SortMode) => void;
  showDead: (s: Circle | "All") => void;
}

export enum SortMode {
  Id,
  Klass,
  Alive,
}

function UserSorter({ setSortMode, showDead }: Props) {
  return (
    <div>
      <Form.Select
        style={{ marginBottom: "1rem" }}
        onChange={(e) => {
          switch (e.target.value) {
            case "Klass":
              setSortMode(SortMode.Klass);
              break;
            case "Id":
              setSortMode(SortMode.Id);
              break;
            case "Lever":
              setSortMode(SortMode.Alive);
              break;
          }
        }}
        aria-label="Default select example"
      >
        <option onChange={() => setSortMode(SortMode.Id)} value="Id">
          Id (killer ordningen)
        </option>
        <option onSelect={() => setSortMode(SortMode.Klass)}>Klass</option>
        <option onSelect={() => setSortMode(SortMode.Alive)}>Lever</option>
      </Form.Select>
      <Form.Select
        style={{ marginBottom: "1rem" }}
        onChange={(e) => {
          console.log("WHAT", e.target.value);
          switch (e.target.value) {
            case "All":
              showDead("All");
              break;
            case "Alive":
              showDead("Alive");
              break;
            case "Dead":
              showDead("Dead");
              break;
            case "None":
              showDead("None");
              break;
          }
        }}
        aria-label="Default select example"
      >
        <option onChange={() => showDead("All")} value="All">
          Alla
        </option>
        <option onSelect={() => showDead("Alive")} value="Alive">
          Lever
        </option>
        <option onSelect={() => showDead("Dead")} value="Dead">
          Dödas
        </option>
        <option onSelect={() => showDead("None")} value="None">
          Ute ur spelet
        </option>
      </Form.Select>
    </div>
  );
}

export default UserSorter;
