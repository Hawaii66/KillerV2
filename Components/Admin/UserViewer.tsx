import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import { Circle, KillerUser } from "../../Interfaces/Interfaces";
import styles from "./admin.module.css";

type ActionType = "MURDER" | "DISC";

interface Props {
  users: KillerUser[];
  showdead: Circle | "All";
  action: (index: number, type: ActionType) => void;
}

function UserViewer({ users, showdead, action }: Props) {
  console.log(showdead);

  return (
    <Table striped hover>
      <thead>
        <tr>
          <th>Id</th>
          <th>Namn</th>
          <th>Target</th>
          <th>Klass</th>
          <th>Epost</th>
          <th>Telefon</th>
          <th>Lever</th>
          <th>Dödas</th>
          <th className="smallheader">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users
          .filter((u) => {
            if (showdead === "All") {
              return true;
            }

            if (showdead === "Alive" && u.alive === "Alive") {
              return true;
            }
            if (showdead === "Dead" && u.alive === "Dead") {
              return true;
            }
            if (showdead === "None" && u.alive === "None") {
              return true;
            }
            return false;
          })
          .map((user) => {
            const target = users.find((u) => u.id === user.target);

            return (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>
                  {target === undefined ? "" : target.id + " " + target.name}
                </td>
                <td>{user.group}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td
                  style={{
                    backgroundColor: user.alive === "Alive" ? "green" : "red",
                    fontSize: 0,
                  }}
                >
                  {user.alive === "Alive" ? 1 : 0}
                </td>
                <td
                  style={{
                    backgroundColor: user.alive === "Dead" ? "green" : "red",
                    fontSize: 0,
                  }}
                >
                  {user.alive === "Dead" ? 1 : 0}
                </td>
                <td>
                  <ButtonGroup>
                    <Button
                      variant="warning"
                      onClick={() => action(user.id, "MURDER")}
                    >
                      Mörda manuellt
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => action(user.id, "DISC")}
                    >
                      Diska
                    </Button>
                  </ButtonGroup>
                </td>
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
}

export default UserViewer;
