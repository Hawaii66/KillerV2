import { NextApiRequest, NextApiResponse } from "next";
import { KillerUser } from "../../../Interfaces/Interfaces";

var AWS = require("aws-sdk");

AWS.config.update({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.PERSONAL_AWS_ACCESS_KEY,
    secretAccessKey: process.env.PERSONAL_AWS_SECRET_KEY,
  },
});

type Data = {};

export const sendSms = async (to: string, text: string) => {
  var params = {
    Message: text,
    PhoneNumber: to,
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
    return;
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = await JSON.parse(req.body);

  var checkUsers: KillerUser[] = [];
  data.users.forEach((user: KillerUser) => {
    if (user.alive) {
      checkUsers.push(user);
    }
  });

  console.log("Sending sms to: ", checkUsers.length);

  const promises: Promise<any>[] = [];
  checkUsers.forEach((user) => {
    if (!user.alive) return;

    var text: string = data.text;
    text = text.replaceAll("<namn>", user.name);
    text = text.replaceAll("<klass>", user.group);
    text = text.replaceAll(
      "<target>",
      data.users.find((u: KillerUser) => u.id === user.target)?.name
    );
    text = text.replaceAll(
      "<targetklass>",
      data.users.find((u: KillerUser) => u.id === user.target)?.group
    );

    const number = `+46${user.phone.substring(1, user.phone.length)}`;

    console.log(number, text);

    promises.push(sendSms(number, text));
  });

  await Promise.all(promises);

  console.log("All sms has been sent");
}
