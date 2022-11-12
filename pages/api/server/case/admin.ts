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
  }

  await connect();
  const kills = dbs.kills;
  const users = dbs.users;

  const killerId = parseInt(params.kill);

  const user: KillerUser | null = await users.findOne({
    id: killerId,
  });
  if (user === null) {
    res.send("Something went wrong");
    return;
  }

  await kills.remove({
    murder: user.id,
  });

  await kills.remove({
    target: user.id,
  });

  await users.findOneAndUpdate(
    {
      id: killerId,
    },
    {
      $set: {
        alive: false,
      },
    }
  );

  await users.findOneAndUpdate(
    {
      target: killerId,
    },
    {
      $set: {
        target: user.target,
      },
    }
  );

  const allusers = await users.find();
  res.json(allusers);
}
