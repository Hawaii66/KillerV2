import React, { useEffect, useState } from "react";
import styles from "../../Components/Admin/admin.module.css";

import "bootstrap/dist/css/bootstrap.min.css";
import ExcelFileLoader from "../../Components/Admin/ExcelFileLoader";
import { KillerUser } from "../../Interfaces/Interfaces";
import UserSorter, { SortMode } from "../../Components/Admin/UserSorter";
import UserViewer from "../../Components/Admin/UserViewer";
import KillerActions from "../../Components/Admin/KillerActions";
import SmsSend from "../../Components/Admin/SmsSend";
import SignIn from "../../Components/Profil/SignIn";
import buttonStyles from "./admin.module.css";
import Admins from "../../Components/Admin/Admins";
import HomeInfoEditor from "../../Components/Admin/HomeInfo";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import {
  InteractionStatus,
  InteractionRequiredAuthError,
} from "@azure/msal-browser";
import { jwt } from "twilio";
function Admin() {
  const [user, setUser] = useState<{ email: string; jwt: string; msal: any }>({
    email: "",
    jwt: "",
    msal: null,
  });
  const [users, setUsers] = useState<KillerUser[]>([]);
  const [showDead, setShowDead] = useState<boolean>(false);
  const { instance, accounts, inProgress } = useMsal();

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

    save(newUsers);
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

    save(prevUsers);
  };

  const save = async (saveusers: KillerUser[]) => {
    const res = await fetch("/api/server/circle", {
      method: "POST",
      body: JSON.stringify(saveusers),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(res);
  };

  const loadGame = async () => {
    const url = `/api/server/circle/all`;
    const result = await fetch(url);

    const data = await result.json();
    setUsers(data);
  };

  useEffect(() => {
    //https://www.daryllukas.me/azure-ad-authentication-using-msal-and-nextjs-react/
    //https://learn.microsoft.com/en-us/azure/active-directory/develop/scenario-spa-acquire-token?tabs=react
    if (inProgress === InteractionStatus.None) {
      const accessTokenRequest = {
        scopes: ["user.read"],
        account: accounts[0],
      };
      instance
        .acquireTokenSilent(accessTokenRequest)
        .then(async (accessTokenResponse) => {
          const result = await isAuthed(
            accessTokenResponse.account?.username || "",
            accessTokenResponse.idToken || ""
          );
          console.log(result);
          if (result) {
            setUser({
              email: accessTokenResponse.account?.username || "",
              jwt: accessTokenResponse.idToken || "",
              msal: null,
            });
            loadGame();
          } else {
            instance.logoutRedirect();
          }
        })
        .catch((error) => {
          if (error instanceof InteractionRequiredAuthError) {
            alert("Något gick fel med inloggninge, försök igen om en stund");
          }
          console.log(error);
          if (accounts.length > 0) {
            instance.logoutRedirect();
          }
        });
    }
  }, [accounts, instance, inProgress]);

  const logout = () => {
    setUser({
      email: "",
      jwt: "",
      msal: null,
    });
    instance.logoutRedirect();
  };

  const killUser = async (userId: number) => {
    const url = `/api/server/case/admin?email=${user.email}&jwt=${user.jwt}&kill=${userId}`;
    const result = await fetch(url);
    console.log(result);
    const newUsers = await result.json();
    setUsers(newUsers);
  };

  const turn = async () => {
    const url = `/api/server/circle/turn?email=${user.email}&jwt=${user.jwt}`;
    const result = await fetch(url);
    const newUsers = await result.json();
    console.log(newUsers);
    setUsers(newUsers);
  };

  const isAuthed = async (email: string, jwt: string) => {
    const url = `/api/server/admin/check?email=${email}&jwt=${jwt}`;
    const result = await fetch(url);
    return result.status === 200;
  };

  const isLoggedIn = () => {
    return (
      <div className={styles.wrapper}>
        <button className={buttonStyles.button} onClick={logout}>
          <img src={"./Images/Logut.svg"} />
        </button>
        <ExcelFileLoader
          setUsers={(u) => {
            setUsers(u);
            save(u);
          }}
        />
        <UserSorter
          showDead={(e) => setShowDead(e)}
          setSortMode={(e) => {
            sort(e);
          }}
        />
        <UserViewer
          showdead={showDead}
          users={users}
          action={(userId, type) => {
            switch (type) {
              case "Kill":
                killUser(userId);
                break;
            }
          }}
        />
        <KillerActions randomise={randomise} turn={turn} />
        <SmsSend users={users} />
        <Admins email={user.email} jwt={user.jwt} />
        <HomeInfoEditor email={user.email} jwt={user.jwt} />
      </div>
    );
  };

  return (
    <>
      <AuthenticatedTemplate>{isLoggedIn()}</AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <SignIn />
      </UnauthenticatedTemplate>
    </>
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
