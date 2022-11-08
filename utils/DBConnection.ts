import monk, { ICollection } from "monk";

export var dbs: {
  kills: ICollection;
  users: ICollection;
  admins: ICollection;
};

export const connect = async () => {
  if (dbs !== undefined) {
    return;
  }

  const db = monk(process.env.MONGO_DB_URI || "");
  const kills: ICollection = db.get("kills");
  const users: ICollection = db.get("circle");
  const admins: ICollection = db.get("admins");

  dbs = {
    kills: kills,
    users: users,
    admins: admins,
  };

  process.on("exit", () => {
    db.close();
  });
};
