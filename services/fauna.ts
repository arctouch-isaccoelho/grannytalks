import { Client } from "faunadb";

export const fauna = new Client({
  secret: <string>process.env.FAUNADB_KEY,
  domain: "db.us.fauna.com",
});
