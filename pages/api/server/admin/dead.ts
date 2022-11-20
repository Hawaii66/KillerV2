import { Data } from "aws-sdk/clients/firehose";
import { NextApiRequest, NextApiResponse } from "next";
import { Circle, KillerUser } from "../../../../Interfaces/Interfaces";
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

  if (req.method === "POST") {
    await connect();

    var deadUsers: any = await dbs.users.find({
      alive: "None",
    });
    var t: any = await dbs.users.find({
      alive: "Dead",
    });
    deadUsers = [...deadUsers, ...t];

    var users: KillerUser[] = [...deadUsers];
    users = shuffle(users);

    users.map((user, index) => {
      user.alive = "Dead";

      var found = false;
      for (var i = index + 1; i < users.length; i++) {
        user.target = users[i].id;
        found = true;
        break;
      }
      if (!found) {
        for (var i = 0; i < users.length; i++) {
          user.target = users[i].id;
          break;
        }
      }
    });

    for (var i = 0; i < users.length; i++) {
      await dbs.users.findOneAndUpdate(
        {
          id: users[i].id,
        },
        {
          $set: {
            alive: "Dead",
            killsDead: 0,
            target: users[i].target,
          },
        }
      );
    }

    res.json(await dbs.users.find());
  }
}

function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
