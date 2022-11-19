import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import SignIn from "../../Components/Profil/SignIn";
import styles from "./profil.module.css";
import Card from "../../Components/Utils/Card/Card";
import Button from "../../Components/Utils/Button/Button";
import ButtonContainer from "../../Components/Utils/Button/ButtonContainer";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import {
  InteractionRequiredAuthError,
  InteractionStatus,
} from "@azure/msal-browser";
import { Circle } from "../../Interfaces/Interfaces";

interface KillerProfile {
  name: string;
  target: string;
  kills: number;
  killsDead: number;
  email: string;
  phone: string;
  group: string;
  targetGroup: string;
  alive: Circle;
  schoolEmail: string;
}

function Profil() {
  const [profile, setProfile] = useState<KillerProfile>({
    email: "",
    schoolEmail: "",
    group: "",
    kills: 0,
    killsDead: 0,
    name: "",
    phone: "",
    target: "",
    targetGroup: "",
    alive: "None",
  });
  const [jwt, setJWT] = useState("");
  const [showTarget, setShowTarget] = useState(false);
  const [hasCase, setHasCase] = useState(true);
  const [loading, setLoading] = useState(true);
  const { accounts, instance, inProgress } = useMsal();

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
        .then((accessTokenResponse: any) => {
          const tempJWt = accessTokenResponse.idToken;
          fetchInfo(accessTokenResponse.account?.username || "", tempJWt);
          setJWT(tempJWt);

          hasActiveCase(accessTokenResponse.account?.username || "", tempJWt);
        })
        .catch((error: any) => {
          if (error instanceof InteractionRequiredAuthError) {
            instance
              .acquireTokenRedirect(accessTokenRequest)
              .then(function (accessTokenResponse: any) {
                console.log(accessTokenResponse);
                const tempTempJWT = accessTokenResponse.idToken;
                fetchInfo(
                  accessTokenResponse.account?.username || "",
                  tempTempJWT
                );
                setJWT(tempTempJWT);

                hasActiveCase(
                  accessTokenResponse.account?.username || "",
                  tempTempJWT
                );
              })
              .catch(function (error: any) {
                // Acquire token interactive failure
                console.log(error);
                alert(
                  "Något gick fel med inloggninge, försök igen om en stund"
                );
              });
          }
          console.log(error);
        });
    }
  }, [accounts, instance, inProgress]);

  const logout = () => {
    instance.logoutRedirect();
  };

  const fetchInfo = async (email: string, jwt: string) => {
    const url = `/api/server/circle?email=${email}&jwt=${jwt}`;
    const result = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (result.status === 401) {
      alert("Du verkar inte vara anmäld till killer");
      return;
    }
    if (result.status !== 200) {
      alert("Något gick fel vid inloggningen. Försök igen om en stund");
      return;
    }

    const data = await result.json();
    const user = data.user;
    const target = data.target;

    setProfile({
      email: user.email,
      group: user.group,
      kills: user.kills,
      name: user.name,
      phone: user.phone,
      target: target.name,
      targetGroup: target.group,
      alive: user.alive,
      schoolEmail: user.schoolEmail,
      killsDead: user.killsDead,
    });
  };

  const hasActiveCase = async (email: string, jwt: string) => {
    const url = `/api/server/case/check?email=${email}&jwt=${jwt}`;
    const result = await fetch(url);
    if (result.status !== 200) {
      return;
    }

    const data = await result.json();

    const caseCount = data.result;

    setHasCase(caseCount === 1);
    setLoading(false);
  };

  const clearActiveCase = async () => {
    setLoading(true);
    const url = `/api/server/case/clear?email=${profile.schoolEmail}&jwt=${jwt}`;
    const result = await fetch(url);

    const data = await result.json();

    const caseCount = data.result;

    setHasCase(caseCount === 1);
    setLoading(false);
  };

  const hasMurdered = async () => {
    //const action = confirm(`Är du säker på att du mördat: ${profile.target}`);
    //if (!action) return;

    setLoading(true);
    const url = `/api/server/murder?type=HAS`;
    await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: profile.schoolEmail,
        jwt: jwt,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setHasCase(true);
    setLoading(false);
  };

  const gotMurdered = async () => {
    //const action = confirm(`Är du säker på att du blev mördad`);
    //if (!action) return;

    setLoading(true);
    const url = `/api/server/murder?type=GOT`;
    await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: profile.schoolEmail,
        jwt: jwt,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setHasCase(true);
    setLoading(false);
  };

  const notLoggedIn = () => {
    return <SignIn />;
  };

  const themeWrapper = (children: React.ReactNode, alive: string) => {
    if (alive === "Dead") {
      return (
        <div style={{ "--main-green": "#E14D2A" } as React.CSSProperties}>
          {children}
        </div>
      );
    }
    return <div>{children}</div>;
  };

  const loggedInRender = () => {
    return (
      <div /*style={{ "--main-green": "#CC3636" } as React.CSSProperties}*/>
        {profile.email === "" && (
          <div className={styles.header}>
            <h1>Laddar information</h1>
            <button onClick={logout}>
              <img src={"./Images/Logut.svg"} />
            </button>
          </div>
        )}

        {profile.email !== "" && (
          <div>
            <div className={styles.header}>
              <h1>{profile.name}</h1>
              <button onClick={logout}>
                <img src={"./Images/Logut.svg"} />
              </button>
            </div>
            {profile.alive !== "None" &&
              themeWrapper(
                <ButtonContainer loading={loading}>
                  {!hasCase ? (
                    <>
                      <Button onClick={hasMurdered}>
                        Jag <b>har</b> mördat
                      </Button>
                      <Button onClick={gotMurdered}>
                        Jag <b>blev</b> mördad
                      </Button>
                    </>
                  ) : (
                    <Button onClick={clearActiveCase}>Rensa mord</Button>
                  )}
                </ButtonContainer>,
                profile.alive
              )}
            <Card>
              <h3>Status:</h3>
              <p>
                {profile.alive === "None"
                  ? "Död"
                  : profile.alive === "Alive"
                  ? "Levande"
                  : "De Dödas Cirkel"}
              </p>
              <h3>
                {profile.alive === "None"
                  ? "Killer 2022"
                  : "Kills i Killer 2022"}
              </h3>
              <p>{profile.kills} st</p>
              {profile.alive === "Dead" && (
                <>
                  {" "}
                  <h3>Kills i de dödas cirkel</h3>
                  <p>{profile.killsDead} st</p>
                </>
              )}
              {profile.alive !== "None" && (
                <>
                  <div className={styles.flexrow}>
                    <h3 className={styles.flexrowtext}>Ditt offer är:</h3>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <button
                      className={styles.targetbutton}
                      onClick={() => {
                        setShowTarget((t) => !t);
                      }}
                    >
                      <img
                        src={`/Images/Eye${showTarget ? "Show" : "Hide"}.svg`}
                        style={{
                          width: "2rem",
                          height: "2rem",
                        }}
                      />
                    </button>
                    <p>
                      {showTarget
                        ? `${profile.target} i klass ${profile.targetGroup}`
                        : "- - - ? - - -"}
                    </p>
                  </div>
                </>
              )}
            </Card>

            <Card>
              <h3>Email:</h3>
              <p>{profile.email}</p>
              <h3>Telefonnummer:</h3>
              <p>{profile.phone}</p>
              <h3>Klass:</h3>
              <p>{profile.group}</p>
            </Card>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <AuthenticatedTemplate>{loggedInRender()}</AuthenticatedTemplate>
      <UnauthenticatedTemplate>{notLoggedIn()}</UnauthenticatedTemplate>
    </>
  );
}

export default Profil;
