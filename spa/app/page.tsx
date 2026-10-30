import Link from "next/link";

export default function Home() {
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
        </div>
      </header>
      <main className="grid grid-cols-2 gap-90 flex-1 rounded-md bg-[#495057] w-full max-w-450 max-h-240 flex-col items-center justify-between py-16 px-16 sm:items-start">
        <div className="grid w-full grid-cols-1 gap-10 h-full">
          <aside className="bg-[#dee2e6] rounded-2xl">
            <p className="text-xl text-[#495057] text-center py-2 border-b-2 font-bold">
              Rankliste
            </p>
          </aside>
          <aside className="bg-[#dee2e6] rounded-2xl">
            <p className="text-xl text-[#495057] text-center py-2 border-b-2 font-bold">
              Tidelgiere kampe
            </p>
          </aside>
        </div>
        <div className="bg-[#dee2e6] h-full rounded-2xl">
          <p className="text-3xl text-[#495057] text-center py-1 border-b-2 font-bold">
            Nuværende kamp
          </p>
        </div>
      </main>
    </div>
  );
}
