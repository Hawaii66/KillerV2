import React, { useState } from "react";
import styles from "../../Components/Admin/admin.module.css";

import "bootstrap/dist/css/bootstrap.min.css";
import ExcelFileLoader from "../../Components/Admin/ExcelFileLoader";
import { KillerUser } from "../../Interfaces/Interfaces";
import UserSorter, { SortMode } from "../../Components/Admin/UserSorter";
import UserViewer from "../../Components/Admin/UserViewer";
import KillerActions from "../../Components/Admin/KillerActions";
import SmsSend from "../../Components/Admin/SmsSend";
function Admin() {
  const [users, setUsers] = useState<KillerUser[]>([]);
  const [showDead, setShowDead] = useState<boolean>(false);

  const sort = (mode: SortMode) => {
    const prevUsers = [...users];
    var newUsers: KillerUser[] = [];

    if (mode === SortMode.Id) {
      var index = 0;
      prevUsers.sort((a, b) => {
        return a.id - b.id;
      });

      newUsers = prevUsers;
    }

    if (mode === SortMode.Alive) {
      var index = 0;
      while (prevUsers.length > 0) {
        if (prevUsers[index].alive) {
          newUsers.push(prevUsers[index]);
          prevUsers.splice(index, 1);
          index = 0;
        } else {
          index += 1;

          if (index >= prevUsers.length) {
            break;
          }
        }
      }

      newUsers = [...newUsers, ...prevUsers];
    }

    if (mode === SortMode.Klass) {
      prevUsers.sort((a, b) => {
        return a.group.localeCompare(b.group);
      });

      newUsers = prevUsers;
    }

    setUsers(newUsers);
  };

  const randomise = () => {
    var prevUsers = [...users];
    prevUsers.sort((a, b) => {
      return a.id - b.id;
    });

    prevUsers = shuffle(prevUsers);

    prevUsers.map((user, index) => {
      user.id = index;

      if (user.alive) {
        var found = false;
        for (var i = index + 1; i < prevUsers.length; i++) {
          if (prevUsers[i].alive) {
            user.target = i;
            found = true;
            break;
          }
        }
        if (!found) {
          for (var i = 0; i < prevUsers.length; i++) {
            if (prevUsers[i].alive) {
              user.target = i;
              break;
            }
          }
        }
      }
    });

    setUsers(prevUsers);
  };

  return (
    <div className={styles.wrapper}>
      <ExcelFileLoader setUsers={(u) => setUsers(u)} />
      <UserSorter
        showDead={(e) => setShowDead(e)}
        setSortMode={(e) => {
          sort(e);
        }}
      />
      <UserViewer showdead={showDead} users={users} />
      <KillerActions randomise={randomise} />
      <SmsSend users={users} />
    </div>
  );
}

function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export default Admin;
