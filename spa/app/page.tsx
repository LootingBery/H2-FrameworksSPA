"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

export default function Home() {
  type Players = {
    id: number;
    username: string;
    elo: number;
    wins: number;
    losses: number;
  };
  type Matches = {
    id: number;
    matchName: string;
    player1Id: number;
    player2Id: number;
    winnerId: number;
    date: string;
  };

  const [players, setPlayers] = useState<Players[]>([]);
  const [matches, setMatches] = useState<Matches[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    setIsRefreshing(true);

    try {
      const [matchesResponse, playersResponse] = await Promise.all([
        fetch("/api/update"),
        fetch("/api/player"),
      ]);

      if (!matchesResponse.ok || !playersResponse.ok) {
        throw new Error("Kunne ikke hente data");
      }

      const [matchesData, playersData] = await Promise.all([
        matchesResponse.json(),
        playersResponse.json(),
      ]);

      setMatches(matchesData);
      setPlayers(playersData);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const sortedPlayers = [...players].sort(
    (playerA, playerB) =>
      (Number(playerB.wins) || 0) - (Number(playerA.wins) || 0),
  );
  const sortedMatches = [...matches].sort((matchA, matchB) => {
    const dateDifference =
      new Date(matchB.date).getTime() - new Date(matchA.date).getTime();

    return dateDifference || matchB.id - matchA.id;
  });

  return (
    <div className="flex flex-col flex-1 py-6 items-center font-roboto ">
      <header className="flex w-full  mb-2 text-[#004080] px-14 pb-3 border-b-4 ">
        <h1 className="font-bold text-left text-4xl pl-0.75">
          De Berylympiske Lege
        </h1>

        <div className="items-center flex gap-4 ml-auto font-bold text-lg">
          <Link
            href="/player"
            className="bg-[#004080] text-white px-4 py-2 rounded hover:bg-[#003366]"
          >
            Opret spiller
          </Link>
          <Link
            href="/match"
            className="bg-[#004080] text-white px-4 py-2 rounded hover:bg-[#003366]"
          >
            Opret ny kamp
          </Link>
          <Link
            href="/update"
            className="bg-[#004080] text-white px-4 py-2 rounded hover:bg-[#003366]"
          >
            Opdater kamp
          </Link>
          <button
            type="button"
            onClick={fetchData}
            disabled={isRefreshing}
            className=" bg-[#008015] text-white px-4 py-2 rounded hover:bg-[#006633]"
          >
            {isRefreshing ? "Opdaterer..." : "Opdater lister"}
          </button>
        </div>
      </header>
      <main className="grid grid-cols-2 gap-90 flex-1 rounded-md bg-[#495057] w-full max-w-450 max-h-240 flex-col items-center justify-between py-16 px-16 sm:items-start">
        <div className="grid w-full grid-cols-1 gap-10 h-full min-h-0">
          <aside className="flex min-h-0 flex-col bg-[#dee2e6] rounded-2xl text-[#495057]">
            <p className="shrink-0 text-3xl text-[#495057] text-center py-2 border-b-2 font-bold">
              Kampe
            </p>
            <div className="min-h-0 flex-1 overflow-y-auto">
              {isLoading ? (
                <p className="text-center py-2">Indlæser...</p>
              ) : matches.length === 0 ? (
                <p className="text-center py-2">Ingen kampe tilgængelige.</p>
              ) : (
                <ul>
                  {sortedMatches.slice(0, 10).map((match) => {
                    const player1 = players.find(
                      (player) => player.id === match.player1Id,
                    );
                    const player2 = players.find(
                      (player) => player.id === match.player2Id,
                    );
                    const winner = players.find(
                      (player) => player.id === match.winnerId,
                    );

                    return (
                      <li key={match.id} className="py-1 text-center">
                        {player1?.username ?? match.player1Id} {"("}
                        {player1?.wins}
                        {")"} {"  "}
                        vs {player2?.username ?? match.player2Id} {"  "}
                        {"("}
                        {player2?.wins}
                        {")"} <br></br> Vinder:
                        {winner?.username ??
                          "Ingen vinder endnu"} <br></br> Date: {match.date}
                        <hr className="my-2 border-t border-[#495057]" />
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </aside>
        </div>
        <div className="flex min-h-0 flex-col bg-[#dee2e6] h-full rounded-2xl text-[#495057]">
          <p className="shrink-0 text-3xl text-[#495057] text-center py-1 border-b-2 font-bold">
            Rankliste
          </p>
          <div className="min-h-0 flex-1 overflow-y-auto text-center">
            {isLoading ? (
              <p className="text-center py-2">Indlæser...</p>
            ) : players.length === 0 ? (
              <p className="text-center py-2">Ingen spillere tilgængelige.</p>
            ) : (
              <ul>
                {sortedPlayers.map((player) => (
                  <li key={player.id} className="py-1">
                    {player.username} <br></br> {player.wins} Sejere &{" "}
                    {player.losses} Tabte
                    {" (Sejere%: " +
                      (
                        (player.wins / (player.wins + player.losses)) *
                        100
                      ).toFixed(2) +
                      "%)"}
                    <hr className="my-2 border-t border-[#495057]" />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
