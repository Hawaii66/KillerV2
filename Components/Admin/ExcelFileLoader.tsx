import React from "react";
import { KillerUser } from "../../Interfaces/Interfaces";
import styles from "./admin.module.css";
import * as XLSX from "xlsx";

interface Props {
  setUsers: (u: KillerUser[]) => void;
}

function ExcelFileLoader({ setUsers }: Props) {
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
          alive: true,
          kills: 0,
          schoolEmail: u["E-post"],
          email: u["Email (Mailen du använder skola eller privat)"],
          group: u["Klass"],
          id: index,
          member: u["Är du medlem i Enskildakåren"] === "Ja",
          name: u["Namn (För & efternamn)"],
          phone: u["Telefonnummer"],
        });
        index += 1;
      });

      setUsers(users);
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
    </div>
  );
}

export default ExcelFileLoader;
