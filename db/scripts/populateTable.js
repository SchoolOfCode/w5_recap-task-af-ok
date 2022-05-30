import query from "../index.js";
import { cats } from "../../app.js";
const SQL_STRING =
  "INSERT INTO cats (name, human, hobby) VALUES($1, $2, $3) RETURNING *";

async function populateTable() {
  for (let i = 0; i < cats.length; i++) {
    const result = await query(SQL_STRING, [
      cats[i].name,
      cats[i].human,
      cats[i].hobby,
    ]);
    console.log(result.rows[0].name, "inserted");
  }
}
populateTable();
