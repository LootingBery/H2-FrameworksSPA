import path from "path";
import fs from "fs/promises";

const databasePath = path.join(process.cwd(), "data", "database.json");

export async function readDatabase() {
  const data = await fs.readFile(databasePath, "utf-8");

  return JSON.parse(data);
}

export async function writeDatabase(data: unknown) {
  await fs.writeFile(databasePath, JSON.stringify(data, null, 2), "utf-8");
}
