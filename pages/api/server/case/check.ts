import { Data } from "aws-sdk/clients/firehose";
import { NextApiRequest, NextApiResponse } from "next";
import { KillerUser } from "../../../../Interfaces/Interfaces";
import { connect, dbs } from "../../../../utils/DBConnection";
import { ValidateToken } from "../../../../utils/verifyToken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const params = req.query;

  const email = params.email;
  const jwtToken = params.jwt;

  const result = await ValidateToken(
    jwtToken?.toString() || "",
    email?.toString() || ""
  );
  if (result === false) {
    res.status(400).send("Wrong auth");
    return;
  }

  await connect();
  const kills = dbs.kills;
  const users = dbs.users;

  const user: KillerUser | null = await users.findOne({
    schoolEmail: email,
  });

  if (user === null || user.email === "") {
    res.status(400).send("No user found with that email");
    return;
  }

  const murders = await kills.findOne({
    murder: user.id,
  });

  if (murders !== null) {
    res.json({
      result: 1,
    });
    return;
  }

  const targets = await kills.findOne({
    target: user.id,
  });

  if (targets !== null) {
    res.json({
      result: 1,
    });
    return;
  }

  res.json({
    result: 0,
  });
  return;
}
