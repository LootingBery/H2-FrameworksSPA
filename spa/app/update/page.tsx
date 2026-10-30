import Link from "next/link";

export default function page() {
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
          <form className="flex flex-col gap-4 p-4">
            <div className="w-full h-185 rounded-lg bg-[#495057]">
              {/* Add match list */}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
