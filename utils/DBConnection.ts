import monk, { ICollection } from "monk";

export var dbs: {
  kills: ICollection;
  users: ICollection;
  admins: ICollection;
  posts: ICollection;
  debug: ICollection;
  confirmed: ICollection;
};

export const connect = async () => {
  if (dbs !== undefined) {
    return;
  }

  const db = monk(process.env.MONGO_DB_URI || "");
  const kills: ICollection = db.get("kills");
  const users: ICollection = db.get("circle");
  const admins: ICollection = db.get("admins");
  const posts: ICollection = db.get("posts");
  const debug: ICollection = db.get("debug");
  const confirmed: ICollection = db.get("confirmed");

  dbs = {
    kills: kills,
    users: users,
    admins: admins,
    posts: posts,
    debug: debug,
    confirmed: confirmed,
  };

  process.on("exit", () => {
    db.close();
  });
};
