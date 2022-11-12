import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import LoginComp from "./LoginComp";
import styles from "./signin.module.css";

interface Props {
  setLoggedIn: (b: boolean, msal: any, email: string, jwt: string) => void;
  msal: any;
}

function SignIn({ setLoggedIn, msal }: Props) {
  return (
    <div className={styles.wrapper}>
      <h1>Logga in för att se din information</h1>
      <p>
        Du måste logga in med din skol email för att vi ska kunna vertifiera
        dig.
      </p>
      <div suppressHydrationWarning={true}>
        <LoginComp visible={true} setLoggedIn={setLoggedIn} />
      </div>
      <div>
        <h1>Om det inte funkar klicka nedan</h1>
        <button onClick={() => msal.logout()}>Logga Ut</button>
      </div>
    </div>
  );
}

export default SignIn;
