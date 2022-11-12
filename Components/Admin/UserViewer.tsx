import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Table } from "react-bootstrap";
import { KillerUser } from "../../Interfaces/Interfaces";
import styles from "./admin.module.css";

type ActionType = "Kill";

interface Props {
  users: KillerUser[];
  showdead: boolean;
  action: (index: number, type: ActionType) => void;
}

function UserViewer({ users, showdead, action }: Props) {
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
          <th className="smallheader">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users
          .filter((u) => {
            return showdead ? true : u.alive;
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
                    backgroundColor: user.alive ? "green" : "red",
                  }}
                />
                <td>
                  <ButtonGroup>
                    <Button onClick={() => action(user.id, "Kill")}>
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
