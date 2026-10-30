import { NextResponse } from "next/server";
import { readDatabase, writeDatabase } from "../../../lib/database";

export async function GET() {
  const database = await readDatabase();

  return NextResponse.json(database.players);
}
export async function POST(request: Request) {
  const database = await readDatabase();

  const body = await request.json();

  const newPlayer = {
    id: database.players.length + 1,
    username: body.username,
    wins: 0,
    elo: 50,
    losses: 0,
  };

  database.players.push(newPlayer);

  await writeDatabase(database);

  return NextResponse.json(newPlayer);
}
