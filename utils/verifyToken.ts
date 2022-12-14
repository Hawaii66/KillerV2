export const ValidateToken = async (accessToken: string, email: string) => {
  var jwt = require("jsonwebtoken");
  const keyUrl = `https://login.microsoftonline.com/${process.env.MICROSOFT_TENANT_ID}/discovery/keys?appid=${process.env.MICROSOFT_APP_ID}`;

  console.log("Checking user token: ", accessToken, email);

  const decodedTemp = jwt.decode(accessToken, { complete: true });
  if (decodedTemp === null) {
    return false;
  }
  const kid = decodedTemp.header.kid;

  const result = await fetch(keyUrl);
  const data: { keys: any[] } = await result.json();
  if (
    data === null ||
    data === undefined ||
    data.keys === null ||
    data.keys === undefined
  ) {
    return false;
  }
  const microsoftPrivateKey = data.keys.find((i) => i.kid === kid).x5c;

  const microsoftKey = `-----BEGIN CERTIFICATE-----\n${microsoftPrivateKey}\n-----END CERTIFICATE-----`;

  var decoded: any = {};
  try {
    decoded = jwt.verify(accessToken, microsoftKey, { algorithms: ["RS256"] });
  } catch (err: any) {
    return false;
  }

  if (decoded === null || decoded.preferred_username !== email) {
    return false;
  }

  return true;
};
