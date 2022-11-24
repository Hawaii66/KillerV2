import { Data } from "aws-sdk/clients/firehose";
import { NextApiRequest, NextApiResponse } from "next";
import { KillerUser } from "../../../../Interfaces/Interfaces";
import { connect, dbs } from "../../../../utils/DBConnection";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connect();

  const users = await dbs.users.find();

  const data = req.body;
  console.log(data[0]);

  await dbs.test.drop();
  await dbs.test.insert(users);

  for (var i = 0; i < data.length; i++) {
    const user: KillerUser = data[i];
    console.log(user.name, user.killsDead);

    await dbs.users.findOneAndUpdate(
      {
        id: user.id,
      },
      {
        $inc: {
          killsDead: user.killsDead,
        },
      }
    );
  }

  res.json(users);
}
