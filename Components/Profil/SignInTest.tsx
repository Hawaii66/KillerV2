import { AuthenticatedTemplate, useMsal } from "@azure/msal-react";
import React from "react";
import Button from "../Utils/Button/Button";

function SignInTest() {
  const { instance } = useMsal();

  const login = async () => {
    instance.loginRedirect();
  };

  return (
    <div>
      <Button onClick={() => login()}>Logga in</Button>
    </div>
  );
}

export default SignInTest;
