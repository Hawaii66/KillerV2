import React from "react";
import dynamic from "next/dynamic";

interface Props {
  visible: boolean;
  setLoggedIn: (b: boolean, msal: any, email: string, jwt: string) => void;
}

function LoginComp({ visible, setLoggedIn }: Props) {
  const LoginComp: any = dynamic(() => import("react-microsoft-login"), {
    ssr: false,
  });
  return (
    <LoginComp
      forceRedirectStrategy={true}
      className={visible ? "on" : "off"}
      authCallback={async (e: any, result: any, msal: any) => {
        await fetch("/api/server/temp", {
          method: "POST",
          body: JSON.stringify({
            error: e === undefined || e === null ? "NO error" : e.toString(),
            result:
              result === undefined || result === null ? "No result" : result,
          }),
        });

        if (
          result !== undefined &&
          result.mail !== null &&
          result.mail.includes("@nykopingsenskilda.se")
        ) {
          if (result.idToken === null || result.idToken === undefined) {
            alert("Något gick fel med vertifiering, försök igen om en stund");
            return;
          }
          setLoggedIn(true, msal, result.mail, result.idToken.rawIdToken);
        } else {
          msal?.logout();
          if (result !== undefined) {
            alert(
              "Fel mail, måste vara din skol email som slutar på @nykopingsenskilda.se"
            );
          }
        }
      }}
      clientId={"f49b1bde-6eb6-44d8-be08-287c5591b46d"}
      graphScopes={["user.read", "email"]}
      withUserData
      buttonTheme="light"
      prompt="login"
    />
  );
}

export default LoginComp;
