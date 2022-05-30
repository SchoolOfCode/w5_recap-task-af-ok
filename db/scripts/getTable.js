import query from "../index.js";
const SQL_STRING = "SELECT * FROM cats";

export default async function getTable() {
  const result = await query(SQL_STRING);
  return result.rows;
}

getTable();
