import { Data } from "aws-sdk/clients/firehose";
import { NextApiRequest, NextApiResponse } from "next";
import { connect, dbs } from "../../../../utils/DBConnection";

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
  await connect();
  const posts = await dbs.posts.find();

  res.json(posts);
};

const postMethod = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await connect();
  const posts = dbs.posts;

  await posts.drop();

  const newPosts = JSON.parse(req.body);
  for (var i = 0; i < newPosts.length; i++) {
    await posts.insert(newPosts[i]);
  }

  res.send("Sparade Posts");
};
