import React, { useState } from "react";
import dynamic from "next/dynamic";

function Profil() {
  const [loggedIn, setLoggedIn] = useState(false);

  const LoginComp = dynamic(() => import("react-microsoft-login"), {
    ssr: false,
  });
  return (
    <div>
      <h1>Logga in för att se ditt offer</h1>
      <div suppressHydrationWarning={true}>
        <LoginComp
          authCallback={(e, result) => {
            if (
              result.mail !== null &&
              result.mail.includes("@nykopingsenskilda.se")
            ) {
              setLoggedIn(true);
            } else {
              alert(
                "Fel mail, måste vara din skol email som slutar på @nykopingsenskilda.se"
              );
            }
          }}
          clientId={"f49b1bde-6eb6-44d8-be08-287c5591b46d"}
          graphScopes={["user.read", "email"]}
          withUserData
          buttonTheme="light"
          prompt="login"
        />
      </div>
    </div>
  );
}

export default Profil;
