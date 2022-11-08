import { Data } from "aws-sdk/clients/firehose";
import { NextApiRequest, NextApiResponse } from "next";
import { connect, dbs } from "../../../../utils/DBConnection";
import { ValidateToken } from "../../../../utils/verifyToken";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    await getMethod(req, res);
  }
  if (req.method === "POST") {
    await postMethod(req, res);
  }
}

const getMethod = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
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
  const admins = dbs.admins;

  const admin: { email: string } | null = await admins.findOne({
    email: email,
  });

  if (admin === null) {
    res.status(401).send("You are not a admin");
    return;
  }

  res.status(200).send("You are a admin");
};

const postMethod = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
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
  const admins = dbs.admins;

  const admin: { email: string } | null = await admins.findOne({
    email: email,
  });

  if (admin === null) {
    res.status(401).send("No admin here");
    return;
  }

  const body = JSON.parse(req.body);
  const method = body.method;

  if (method === "REMOVE") {
    await admins.remove({
      email: body.email,
    });
    res.status(200).send("Removed");
    return;
  }
  if (method === "INSERT") {
    await admins.insert({
      email: body.email,
    });
    res.status(200).send("Insert");
    return;
  }
  if (method === "ALL") {
    const all = await admins.find();
    res.status(200).json(all);
    return;
  }

  console.log(req.body.method, method);
  res.status(400).send("Wrong method");
};
