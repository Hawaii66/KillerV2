import { Data } from "aws-sdk/clients/firehose";
import { NextApiRequest, NextApiResponse } from "next";
import { connect, dbs } from "../../../utils/DBConnection";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connect();

  const debug = dbs.debug;

  const data = JSON.parse(req.body);
  debug.insert(data);
}
