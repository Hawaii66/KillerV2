import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { KillerUser } from "../../Interfaces/Interfaces";
import styles from "./admin.module.css";

interface Props {
  users: KillerUser[];
  showdead: boolean;
}

function UserViewer({ users, showdead }: Props) {
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
              </tr>
            );
          })}
      </tbody>
    </Table>
  );
}

export default UserViewer;
