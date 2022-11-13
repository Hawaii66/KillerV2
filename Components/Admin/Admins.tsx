import React, { useEffect, useState } from "react";
import { Button, ListGroup } from "react-bootstrap";
import styles from "./admin.module.css";

interface Props {
  email: string;
  jwt: string;
}

function Admins({ email, jwt }: Props) {
  const [admins, setAdmins] = useState<string[]>([]);

  const fetchAdmins = async () => {
    const url = `/api/server/admin/check?email=${email}&jwt=${jwt}`;
    const result = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        method: "ALL",
      }),
    });

    const all: { email: string }[] = await result.json();
    setAdmins(all.map((i) => i.email));
  };

  const remove = async (removeEmail: string) => {
    if (removeEmail === email) {
      alert("Kan inte ta bort sig själv");
      return;
    }

    if (admins.length === 1) {
      alert("Kan inte ta bort sista adminen");
      return;
    }

    const url = `/api/server/admin/check?email=${email}&jwt=${jwt}`;
    await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        method: "REMOVE",
        email: removeEmail,
      }),
    });

    await fetchAdmins();
  };
  const insert = async () => {
    const addEmail = prompt("Vem ska bli admin");
    const url = `/api/server/admin/check?email=${email}&jwt=${jwt}`;
    await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        method: "INSERT",
        email: addEmail,
      }),
    });

    await fetchAdmins();
  };

  useEffect(() => {
    fetchAdmins();
  }, [email, jwt]);

  return (
    <div className={styles.center}>
      <h1 className={styles.header}>Admins</h1>
      <ListGroup>
        {admins.map((email) => {
          return (
            <ListGroup.Item key={email} className={styles.flexrow}>
              <p>{email}</p>
              <Button onClick={() => remove(email)}>X</Button>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
      <Button onClick={() => insert()} className={styles.button}>
        Lägg till admin
      </Button>
    </div>
  );
}

export default Admins;
