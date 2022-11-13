import { Data } from "aws-sdk/clients/firehose";
import { NextApiRequest, NextApiResponse } from "next";
import { KillerUser } from "../../../Interfaces/Interfaces";
import monk, { ICollection } from "monk";
import { connect, dbs } from "../../../utils/DBConnection";
import AccessToken from "twilio/lib/jwt/AccessToken";
import { ValidateToken } from "../../../utils/verifyToken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const users: KillerUser[] = req.body;

    await connect();
    const circleDB = dbs.users;

    await circleDB.drop();
    await circleDB.insert(users);

    res.send("Successfully reset the circle");
  }

  if (req.method === "GET") {
    const param = req.query;
    const email = param.email;
    const jwtToken = param.jwt;

    if (email === undefined || jwtToken === undefined) {
      res.status(400).send("Wrong email or jwt");
      return;
    }

    const result = await ValidateToken(
      jwtToken?.toString() || "",
      email?.toString() || ""
    );
    if (result === false) {
      res.status(400).send("Wrong auth");
      return;
    }

    await connect();
    const circleDB = dbs.users;

    const user = await circleDB.findOne({
      schoolEmail: email,
    });

    if (user === null) {
      res.status(401).send("No user found with that email");
      return;
    }

    const target = await circleDB.findOne({
      id: user.target,
    });

    res.json({
      user: user,
      target: {
        name: target.name,
        group: target.group,
      },
    });
  }
}
