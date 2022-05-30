import query from "../index.js";
const SQL_STRING =
  "CREATE TABLE IF NOT EXISTS cats (id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY, name TEXT, human TEXT, hobby TEXT)";

async function createTable() {
  const result = await query(SQL_STRING);
  console.log(result);
}

createTable();
