import { Data } from "aws-sdk/clients/firehose";
import { NextApiRequest, NextApiResponse } from "next";
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

  const killerId = parseInt(params.kill?.toString() || "");
  const murderMethod = params.method?.toString() || "";

  if (murderMethod === "MURDER") {
    await murderVictim(killerId);
  }

  if (murderMethod === "DISC") {
    await discVictim(killerId);
  }

  connect();
  const users = await dbs.users.find();

  res.json(users);
}

const murderVictim = async (killerId: number) => {
  await connect();
  const kills = dbs.kills;
  const users = dbs.users;
  const confirmed = dbs.confirmed;

  //Fetch both persons
  const victim = await users.findOne({
    id: killerId,
  });
  const murder = await users.findOne({
    target: killerId,
    alive: victim.alive,
  });

  //Clear all useless kills
  kills.remove({
    target: victim.id,
  });
  kills.remove({
    murder: victim.id,
  });
  kills.remove({
    murder: murder.id,
  });

  //Kill victim
  await users.findOneAndUpdate(
    {
      id: killerId,
    },
    {
      $set: {
        alive: "None",
      },
    }
  );

  //Insert stat kill
  await confirmed.insert({
    murder: murder.email,
    target: victim.email,
    circle: murder.alive,
    time: Date.now(),
  });

  //Update murder information
  await users.findOneAndUpdate(
    {
      id: murder.id,
    },
    {
      $set: {
        target: victim.target,
      },
      $inc: {
        kills: murder.alive === "Alive" ? 1 : 0,
        killsDead: murder.alive === "Dead" ? 1 : 0,
      },
    }
  );
};

const discVictim = async (killerId: number) => {
  await connect();
  const kills = dbs.kills;
  const users = dbs.users;
  const confirmed = dbs.confirmed;

  //Fetch both persons
  const victim = await users.findOne({
    id: killerId,
  });
  const murder = await users.findOne({
    target: killerId,
    alive: victim.alive,
  });

  //Clear all useless kills
  kills.remove({
    target: victim.id,
  });
  kills.remove({
    murder: victim.id,
  });
  kills.remove({
    murder: murder.id,
  });

  //Kill victim
  await users.findOneAndUpdate(
    {
      id: killerId,
    },
    {
      $set: {
        alive: "None",
      },
    }
  );

  //Update murder information
  await users.findOneAndUpdate(
    {
      id: murder.id,
    },
    {
      $set: {
        target: victim.target,
      },
    }
  );
};
