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
  const users = dbs.users;

  var newUsers: KillerUser[] = [];
  const allUsers: KillerUser[] = await users.find();
  allUsers.forEach((user) => {
    const targetUser = allUsers.find((find) => find.target === user.id);
    if (targetUser === undefined) {
      return;
    }
    newUsers.push({
      ...user,
      target: targetUser.id,
    });
  });

  for (var i = 0; i < newUsers.length; i++) {
    await users.findOneAndUpdate(
      {
        id: newUsers[i].id,
      },
      {
        $set: {
          target: newUsers[i].target,
        },
      }
    );
  }
  res.json(newUsers);
}
