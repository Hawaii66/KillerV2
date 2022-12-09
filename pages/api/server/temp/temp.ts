import { Data } from "aws-sdk/clients/firehose";
import { NextApiRequest, NextApiResponse } from "next";
import { KillerUser } from "../../../../Interfaces/Interfaces";
import monk, { ICollection } from "monk";
import { connect, dbs } from "../../../../utils/DBConnection";
import AccessToken from "twilio/lib/jwt/AccessToken";
import { ValidateToken } from "../../../../utils/verifyToken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const users: KillerUser[] = req.body;// JSON.parse(req.body);

    await connect();
    await dbs.users.drop();
    const circle = dbs.users;
    /*for (var i = 0; i < users.length; i++) {
      await circle.insert(users[i]);
      console.log("Inserting: ", users[i].name, users[i].schoolEmail);
    }*/
    await circle.insert(users);

    console.log("DOne");
    res.status(200).send("Success");
  }
}
