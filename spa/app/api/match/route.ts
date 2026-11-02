import { NextResponse } from "next/server";
import { readDatabase, writeDatabase } from "../../../lib/database";

export async function GET() {
  const database = await readDatabase();

  return NextResponse.json(database.players);
}
export async function POST(request: Request) {
  const database = await readDatabase();

  const body = await request.json();
  const player1 = database.players.find(
    (player: { id: number }) => player.id === Number(body.player1Id),
  );
  const player2 = database.players.find(
    (player: { id: number }) => player.id === Number(body.player2Id),
  );

  if (!player1 || !player2 || player1.id === player2.id) {
    return NextResponse.json(
      { error: "Vælg to forskellige spillere" },
      { status: 400 },
    );
  }

  const newMatch = {
    id: database.matches.length + 1,
    matchName: `${player1.username} vs ${player2.username}`,
    player1Id: player1.id,
    player2Id: player2.id,
    winnerId: 0,
    date: new Date().toISOString().split("T")[0],
  };

  database.matches.push(newMatch);

  await writeDatabase(database);

  return NextResponse.json(newMatch);
}
