import * as msal from "@azure/msal-browser";

const msalConfig = {
  auth: {
    clientId: "3c3cbd80-41db-463a-9a07-9ea8ffe90d29" || "",
    authority: `https://login.microsoftonline.com/${"1b94f604-47d8-4d3f-9ba5-0886428fc9e6"}`,
    redirectUri: "/profil",
  },
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

export { msalInstance };
