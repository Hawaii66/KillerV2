import { NextApiRequest, NextApiResponse } from "next";

var AWS = require("aws-sdk");

type Data = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  var params = {
    Message: "Välkommen till Killer 2022!",
    PhoneNumber: "+46703290705",
    MessageAttributes: {
      "AWS.SNS.SMS.SenderID": {
        DataType: "String",
        StringValue: "Killer",
      },
    },
  };

  var publishTextPromise = new AWS.SNS({
    apiVersion: "2010-03-31",
  })
    .publish(params)
    .promise();

  publishTextPromise.then((data: any) => {
    console.log(data);
    res.send("Successs");
  });
}
