import React from "react";
import { KillerUser } from "../../Interfaces/Interfaces";
import styles from "./admin.module.css";
import * as XLSX from "xlsx";

interface Props {
  setUsers: (u: KillerUser[]) => void;
  userTotal: number;
}

function ExcelFileLoader({ setUsers, userTotal }: Props) {
  const readFile = (file: any) => {
    const promise = new Promise((res, rej) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target?.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        res(data);
      };

      fileReader.onerror = (e) => {
        console.log(e);
        rej(e);
      };
    });

    promise.then((d: any) => {
      var users: KillerUser[] = [];
      var index = 0;
      d.forEach((u: any) => {
        users.push({
          target: -1,
          alive: "Alive",
          kills: 0,
          schoolEmail: u["E-post"],
          email: u["Email (Mailen du använder skola eller privat)"],
          group: u["Klass"],
          id: index,
          member: u["Är du medlem i Enskildakåren"] === "Ja",
          name: u["Namn (För & efternamn)"],
          phone: u["Telefonnummer"],
          killsDead: 0,
        });
        index += 1;
      });

      setUsers(users);
    });
  };

  const addDead = (file: any) => {
    const promise = new Promise((res, rej) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target?.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });
        const wsname = wb.SheetNames[1];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        res(data);
      };

      fileReader.onerror = (e) => {
        console.log(e);
        rej(e);
      };
    });

    promise.then(async (d: any) => {
      var users: KillerUser[] = [];
      var userIndex = userTotal;
      d.forEach((u: any) => {
        users.push({
          alive: "None",
          email: u["E-post"],
          group: u["Klass"],
          id: userIndex,
          kills: 0,
          killsDead: 0,
          member: true,
          name: u["Namn (För & efternamn)"],
          phone: u["Telefonnummer"],
          schoolEmail: u["E-post"],
          target: -1,
        });

        userIndex += 1;
      });

      console.log(users);

      const url = `/api/server/temp/temp`;
      const result = await fetch(url, {
        method: "POST",
        body: JSON.stringify(users),
      });
      console.log(result);
    });
  };

  return (
    <div className={styles.spacer}>
      <h3>Välj excel fil för att starta om killer: </h3>
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files === null) {
            return;
          }
          const file = e.target.files[0];
          readFile(file);
        }}
      />
      <h3>Lägg till döda personer: </h3>
      <input
        type="file"
        onChange={(e) => {
          if (e.target.files === null) {
            return;
          }
          const file = e.target.files[0];
          addDead(file);
        }}
      />
    </div>
  );
}

export default ExcelFileLoader;
