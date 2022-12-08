import { Data } from "aws-sdk/clients/firehose";
import { NextApiRequest, NextApiResponse } from "next";
import { connect, dbs } from "../../../utils/DBConnection";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connect();
  const posts = await dbs.posts.find();

  for (var i = 0; i < posts.length; i++) {
    posts[i].index = i;
  }

  console.log(posts);

  for (var i = 0; i < posts.length; i++) {
    await dbs.posts.findOneAndUpdate(
      {
        _id: posts[i]._id,
      },
      {
        $set: {
          index: posts[i].index,
        },
      }
    );

    console.log("Updating", posts[i].title);
  }

  console.log("DOne");
}
