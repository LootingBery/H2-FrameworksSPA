"use client";

import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [username, setUsername] = useState("");
  const [playerId, setPlayerId] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await fetch("/api/player", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          playerId: playerId,
        }),
      });

      if (!response.ok) {
        throw new Error("Kunne ikke oprette spiller");
      }

      const data = await response.json();

      setMessage(`Spiller ${data.username} blev oprettet!`);
      setMessageType("success");

      setUsername("");
      setPlayerId("");
    } catch (error) {
      console.error(error);
      setMessage("Der opstod en fejl!");
      setMessageType("error");
    }
  }

  return (
    <div className="flex flex-col flex-1 py-6 items-center font-roboto">
      <header className="flex w-full mb-2 text-[#004080] px-14 pb-3 border-b-4">
        <h1 className="font-bold text-left text-4xl pl-0.75">
          De Berylympiske Lege | Opret Spiller
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
        <div />

        <div className="bg-[#dee2e6] h-full rounded-2xl">
          <p className="text-3xl text-center py-1 border-b-2 font-bold">
            Opret ny spiller
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
            <input
              type="text"
              placeholder="Spiller navn"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="bg-[#f8f9fa] border border-[#ced4da] rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#004080]"
            />

            <input
              type="text"
              placeholder="Spiller ID"
              value={playerId}
              onChange={(e) => setPlayerId(e.target.value)}
              required
              className="bg-[#f8f9fa] border border-[#ced4da] rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#004080]"
            />

            <button
              type="submit"
              className="bg-[#004080] text-white px-4 py-2 rounded hover:bg-[#003366]"
            >
              Opret spiller
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

            <div className="border-b-2 border-[#495057]" />

            <div className="w-full h-137 rounded-lg bg-[#495057]">
              {/* Add player list */}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
