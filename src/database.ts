import { Pool } from "pg";
export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password: "test1234",
  database: "tdb",
  port: 5432,
});
