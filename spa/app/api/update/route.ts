import { NextResponse } from "next/server";
import { readDatabase, writeDatabase } from "../../../lib/database";

type Player = {
  id: number;
  wins: number;
  losses: number;
};

export async function GET() {
  const database = await readDatabase();

  return NextResponse.json(database.matches);
}

export async function PATCH(request: Request) {
  const database = await readDatabase();
  const body = await request.json();
  const match = database.matches.find(
    (item: { id: number }) => item.id === Number(body.matchId),
  );
  const winnerId = Number(body.winnerId);
  const previousWinnerId = match?.winnerId ?? 0;

  if (!match) {
    return NextResponse.json({ error: "Kamp ikke fundet" }, { status: 404 });
  }

  if (winnerId !== match.player1Id && winnerId !== match.player2Id) {
    return NextResponse.json(
      { error: "Vinderen skal være en spiller i kampen" },
      { status: 400 },
    );
  }

  const winner = database.players.find(
    (player: Player) => player.id === winnerId,
  );
  const loser = database.players.find(
    (player: Player) =>
      player.id ===
      (winnerId === match.player1Id ? match.player2Id : match.player1Id),
  );

  if (!winner || !loser) {
    return NextResponse.json(
      { error: "Spillere i kampen blev ikke fundet" },
      { status: 404 },
    );
  }

  if (previousWinnerId && previousWinnerId !== winnerId) {
    const previousWinner = database.players.find(
      (player: Player) => player.id === previousWinnerId,
    );
    const previousLoser = database.players.find(
      (player: Player) =>
        player.id ===
        (previousWinnerId === match.player1Id
          ? match.player2Id
          : match.player1Id),
    );

    if (previousWinner) {
      previousWinner.wins = Math.max(0, Number(previousWinner.wins) - 1);
    }
    if (previousLoser) {
      previousLoser.losses = Math.max(0, Number(previousLoser.losses) - 1);
    }
  }

  match.winnerId = winnerId;

  if (previousWinnerId !== winnerId) {
    const currentWins = Number(winner.wins);
    const currentLosses = Number(loser.losses);

    winner.wins = (Number.isFinite(currentWins) ? currentWins : 0) + 1;
    loser.losses = (Number.isFinite(currentLosses) ? currentLosses : 0) + 1;
  }

  await writeDatabase(database);

  return NextResponse.json(match);
}
