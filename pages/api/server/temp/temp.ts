import { Data } from "aws-sdk/clients/firehose";
import { NextApiRequest, NextApiResponse } from "next";
import { KillerUser } from "../../../../Interfaces/Interfaces";
import { connect, dbs } from "../../../../utils/DBConnection";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    await connect();
    const users: any[] = await dbs.users.find();
    await dbs.test.drop();
    await dbs.test.insert(users);
    for (var i = 0; i < users.length; i++) {
      users[i].alive = users[i].alive ? "Alive" : "Dead";
    }

    console.log("Done");
    await dbs.users.drop();
    console.log("DRip");
    await dbs.users.insert(users);
    console.log("DOne");
    res.send("");
  }
}
