"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type Player = {
  id: number;
  username: string;
};

export const DatePicker: React.FC = () => {
  const today = new Date().toISOString().split("T")[0];

  return (
    <input
      type="date"
      required
      min={today}
      className="bg-[#f8f9fa] border border-[#ced4da] rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#004080]"
    />
  );
};
export default function Page() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [firstPlayerId, setFirstPlayerId] = useState("");
  const [secondPlayerId, setSecondPlayerId] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [isLoadingPlayers, setIsLoadingPlayers] = useState(true);

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const response = await fetch("/api/player");

        if (!response.ok) {
          throw new Error("Kunne ikke hente spillere");
        }

        setPlayers(await response.json());
      } catch (error) {
        console.error(error);
        setMessage("Kunne ikke hente spillere.");
        setMessageType("error");
      } finally {
        setIsLoadingPlayers(false);
      }
    }

    fetchPlayers();
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await fetch("/api/match", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          player1Id: firstPlayerId,
          player2Id: secondPlayerId,
        }),
      });

      if (!response.ok) {
        throw new Error("Kunne ikke oprette kamp");
      }

      const data = await response.json();

      setMessage(`Kamp ${data.matchName} blev oprettet!`);
      setMessageType("success");

      setFirstPlayerId("");
      setSecondPlayerId("");
    } catch (error) {
      console.error(error);
      setMessage("Der opstod en fejl!");
      setMessageType("error");
    }
  }

  return (
    <div className="flex flex-col flex-1 py-6 items-center font-roboto ">
      <header className="flex w-full  mb-2 text-[#004080] px-14 pb-3 border-b-4 ">
        <h1 className="font-bold text-left text-4xl pl-0.75">
          De Berylympiske Lege | Opret Kamp
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
        <div className="flex flex-col bg-[#dee2e6] h-flex rounded-2xl">
          <p className="text-3xl text-center py-1 border-b-2 font-bold">
            Opret ny kamp
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
            <select
              value={firstPlayerId}
              onChange={(e) => setFirstPlayerId(e.target.value)}
              required
              className="bg-[#f8f9fa] border border-[#ced4da] rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#004080]"
            >
              <option value="">
                {isLoadingPlayers
                  ? "Henter spillere..."
                  : "Vælg første spiller"}
              </option>
              {players.map((player) => (
                <option key={player.id} value={player.id}>
                  {player.username}
                </option>
              ))}
            </select>
            <select
              value={secondPlayerId}
              onChange={(e) => setSecondPlayerId(e.target.value)}
              required
              className="bg-[#f8f9fa] border border-[#ced4da] rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#004080]"
            >
              <option value="">
                {isLoadingPlayers ? "Henter spillere..." : "Vælg anden spiller"}
              </option>
              {players.map((player) => (
                <option key={player.id} value={player.id}>
                  {player.username}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="bg-[#004080] text-white px-4 py-2 rounded hover:bg-[#003366]"
            >
              Opret kamp
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
          </form>
        </div>
      </main>
    </div>
  );
}
