export default function Home() {
  return (
    <div className="flex flex-col flex-1 py-6 items-center font-roboto ">
      <header className="flex w-full  mb-2 text-[#004080] px-14 pb-3 border-b-4 ">
        <h1 className="font-bold text-left text-4xl pl-0.75">
          De Berylympiske Lege
        </h1>

        <div className="items-center flex gap-4 ml-auto">
          <button className="bg-[#004080] text-white px-4 py-2 rounded hover:bg-[#003366]">
            Opret ny spiller
          </button>
          <button className="bg-[#004080] text-white px-4 py-2 rounded hover:bg-[#003366]">
            Opret ny kamp
          </button>
          <button className="bg-[#004080] text-white px-4 py-2 rounded hover:bg-[#003366]">
            Opdater kamp
          </button>
        </div>
      </header>
      <main className="grid grid-cols-2 gap-90 flex-1 rounded-md bg-[#495057] w-full max-w-450 max-h-240 flex-col items-center justify-between py-16 px-16 sm:items-start">
        <div className="grid w-full grid-cols-1 gap-10 h-full">
          <aside className="bg-[#dee2e6] rounded-2xl">
            <p className="text-lg text-[#495057] text-center py-2 border-b-2">
              Rankliste{" "}
            </p>
          </aside>
          <aside className="bg-[#dee2e6] rounded-2xl">
            <p className="text-lg text-[#495057] text-center py-2 border-b-2">
              Tidelgiere kampe
            </p>
          </aside>
        </div>
        <div className="bg-[#dee2e6] h-full rounded-2xl">
          <p className="text-lg text-[#495057] text-center py-2">
            Nuværende kamp
          </p>
        </div>
      </main>
    </div>
  );
}
