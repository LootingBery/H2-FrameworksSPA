"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

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

export default function Page() {
  const [players, setPlayers] = useState<Players[]>([]);
  const [matches, setMatches] = useState<Matches[]>([]);
  const [selectedMatchId, setSelectedMatchId] = useState("");
  const [winnerId, setWinnerId] = useState("");

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [matchesResponse, playersResponse] = await Promise.all([
          fetch("/api/update"),
          fetch("/api/player"),
        ]);

        if (!matchesResponse.ok || !playersResponse.ok) {
          throw new Error("Kunne ikke hente kampdata");
        }

        const [matchesData, playersData] = await Promise.all([
          matchesResponse.json(),
          playersResponse.json(),
        ]);

        setMatches(matchesData);
        setPlayers(playersData);
      } catch (error) {
        console.error(error);
        setMessage("Kunne ikke hente kampdata.");
        setMessageType("error");
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  const selectedMatch = matches.find(
    (match) => match.id === Number(selectedMatchId),
  );
  const matchPlayers = selectedMatch
    ? players.filter(
        (player) =>
          player.id === selectedMatch.player1Id ||
          player.id === selectedMatch.player2Id,
      )
    : [];

  function handleMatchChange(matchId: string) {
    const match = matches.find((item) => item.id === Number(matchId));

    setSelectedMatchId(matchId);
    setWinnerId(match && match.winnerId ? String(match.winnerId) : "");
    setMessage("");
    setMessageType("");
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await fetch("/api/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          matchId: selectedMatchId,
          winnerId,
        }),
      });

      if (!response.ok) {
        throw new Error("Kunne ikke opdatere kamp");
      }

      const updatedMatch = await response.json();
      setMatches((currentMatches) =>
        currentMatches.map((match) =>
          match.id === updatedMatch.id ? updatedMatch : match,
        ),
      );
      setMessage("Kampens vinder blev opdateret.");
      setMessageType("success");
    } catch (error) {
      console.error(error);
      setMessage("Der opstod en fejl ved opdatering af kampen.");
      setMessageType("error");
    }
  }

  return (
    <div className="flex flex-col flex-1 py-6 items-center font-roboto ">
      <header className="flex w-full  mb-2 text-[#004080] px-14 pb-3 border-b-4 ">
        <h1 className="font-bold text-left text-4xl pl-0.75">
          De Berylympiske Lege | Opdater Kamp
        </h1>

        <div className="items-center flex gap-4 ml-auto font-bold text-lg">
          <Link
            href="/"
            className="bg-[#004080] text-white px-4 py-2 rounded hover:bg-[#003366]"
          >
            Forside
          </Link>
        </div>
      </header>
      <main className="grid grid-cols-3 flex-1 rounded-md text-[#495057] bg-[#495057] w-full max-w-450 max-h-240 flex-col items-center justify-between py-16 px-16 sm:items-start">
        <div> {/* Filler */} </div>
        <div className="bg-[#dee2e6] h-full rounded-2xl">
          <p className="text-3xl text-center py-1 border-b-2 font-bold">
            Opdater kamp
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
            <select
              value={selectedMatchId}
              onChange={(e) => handleMatchChange(e.target.value)}
              required
              className="bg-[#f8f9fa] border border-[#ced4da] rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#004080]"
            >
              <option value="">
                {isLoading ? "Henter kampe..." : "Vælg kamp"}
              </option>
              {matches.map((match) => (
                <option key={match.id} value={match.id}>
                  {match.matchName}
                </option>
              ))}
            </select>
            <select
              value={winnerId}
              onChange={(e) => {
                const selectedWinnerId = e.target.value;
                setWinnerId(selectedWinnerId);
              }}
              required
              disabled={!selectedMatch}
              className="bg-[#f8f9fa] border border-[#ced4da] rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#004080] disabled:opacity-60"
            >
              <option value="">Vælg vinder</option>
              {matchPlayers.map((player) => (
                <option key={player.id} value={player.id}>
                  {player.username}
                </option>
              ))}
            </select>
            <button
              type="submit"
              disabled={!selectedMatch}
              className="bg-[#004080] text-white px-4 py-2 rounded hover:bg-[#003366] disabled:opacity-60"
            >
              Opdater vinder
            </button>
            {message && (
              <p
                className={`text-center font-bold ${
                  messageType === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
            <div className="w-full h-150 rounded-lg bg-[#495057] text-2xl text-white overflow-y-auto">
              {/* Add match list */}
              {matches.map((match) => (
                <div key={match.id} className="p-2 border-b border-[#ced4da]">
                  <p className="font-bold">{match.matchName}</p>
                </div>
              ))}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
