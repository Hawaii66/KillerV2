import { Data } from "aws-sdk/clients/firehose";
import { NextApiRequest, NextApiResponse } from "next";
import {
  Circle,
  ConfirmedKill,
  KillerUser,
} from "../../../Interfaces/Interfaces";
import monk, { ICollection } from "monk";
import { connect, dbs } from "../../../utils/DBConnection";
import { ValidateToken } from "../../../utils/verifyToken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const params = req.query;
    const type = params.type;
    if (type === undefined) {
      res.send("Wrong type");
      return;
    }

    const jwtToken = req.body.jwt;
    if (jwtToken === null || jwtToken === undefined) {
      res.status(400).send("NO JWT availabel");
      return;
    }

    const result = await ValidateToken(
      jwtToken?.toString() || "",
      req.body.email?.toString() || ""
    );
    if (result === false) {
      res.status(400).send("Wrong auth");
    }

    if (type === "GOT") {
      const result = await gotMurdered(req.body.email);
      res.send(result);
    }

    if (type === "HAS") {
      const result = await hasMurdered(req.body.email);
      res.send(result);
    }
  }
}

const addMurderStat = async (
  murderer: string,
  target: string,
  circle: Circle
) => {
  await connect();

  const confirmed = dbs.confirmed;

  const t: ConfirmedKill = {
    murder: murderer,
    target: target,
    time: Date.now(),
    circle: circle,
  };

  confirmed.insert(t);
};

const hasMurdered = async (email: string) => {
  await connect();
  const kills = dbs.kills;
  const users = dbs.users;

  const user = await users.findOne({
    schoolEmail: email,
  });

  const t = await kills.findOne({
    target: user.target,
  });

  if (t === null) {
    if (
      (await kills.findOne({
        murder: user.id,
      })) !== null
    ) {
      return -1;
    }

    await kills.insert({
      murder: user.id,
    });

    return -1;
  } else {
    await kills.remove({
      target: user.target,
    });

    const userTarget = await users.findOne({
      id: user.target,
    });

    await users.update(
      {
        id: user.id,
      },
      {
        $inc: {
          kills: user.alive === "Alive" ? 1 : 0,
          killsDead: user.alive === "Dead" ? 1 : 0,
        },
        $set: {
          target: userTarget.target,
        },
      }
    );

    await users.update(
      {
        id: user.target,
      },
      {
        $set: {
          alive: "None",
        },
      }
    );

    await addMurderStat(user.email, userTarget.email, user.alive);

    return 1;
  }
};

const gotMurdered = async (email: string) => {
  await connect();
  const kills = dbs.kills;
  const users = dbs.users;

  const user = await users.findOne({
    schoolEmail: email,
  });
  const murder = await users.findOne({
    target: user.id,
  });

  const t = await kills.findOne({
    murder: murder.id,
  });

  if (t === null) {
    if (
      (await kills.findOne({
        target: user.id,
      })) !== null
    ) {
      return -1;
    }

    await kills.insert({
      target: user.id,
    });

    return -1;
  } else {
    await kills.remove({
      murder: murder.id,
    });

    await users.update(
      {
        id: murder.id,
      },
      {
        $inc: {
          kills: user.alive === "Alive" ? 1 : 0,
          killsDead: user.alive === "Dead" ? 1 : 0,
        },
        $set: {
          target: user.target,
        },
      }
    );

    await users.update(
      {
        id: user.id,
      },
      {
        $set: {
          alive: "None",
        },
      }
    );

    await addMurderStat(murder.email, user.email, user.alive);

    return 1;
  }
};
