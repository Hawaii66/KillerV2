import monk, { ICollection } from "monk";

export var dbs: {
  kills: ICollection;
  users: ICollection;
  admins: ICollection;
  posts: ICollection;
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

  dbs = {
    kills: kills,
    users: users,
    admins: admins,
    posts: posts,
  };

  process.on("exit", () => {
    db.close();
  });
};
