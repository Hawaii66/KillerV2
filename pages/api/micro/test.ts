// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {
  ClientOptions,
  Client,
  AuthProvider,
  AuthProviderCallback,
  AuthenticationProvider,
  AuthenticationProviderOptions,
} from "@microsoft/microsoft-graph-client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const test: any = (callback: any) => {
    callback(null, "f49b1bde-6eb6-44d8-be08-287c5591b46d");
  };

  let clientOptions: ClientOptions = {
    authProvider: test,
  };

  const client = Client.initWithMiddleware(clientOptions);
  console.log(client);

  client.api("/users/f2930504-34cf-48e0-a421-1484b7cda3a2").get((t) => {
    console.log(t);
  });
}
