import React from "react";
import { Button, Form } from "react-bootstrap";
import styles from "../../Components/Admin/admin.module.css";

interface Props {
  setSortMode: (s: SortMode) => void;
  showDead: (s: boolean) => void;
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
      <Form.Check
        onChange={(e) => {
          showDead(e.target.checked);
        }}
        type="switch"
        id="custom-switch"
        label="Visa döda personer?"
      />
    </div>
  );
}

export default UserSorter;
