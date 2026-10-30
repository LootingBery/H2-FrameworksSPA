import Link from "next/link";

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

export default function page() {
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
        <div className="bg-[#dee2e6] h-full rounded-2xl">
          <p className="text-3xl text-center py-1 border-b-2 font-bold">
            Opret ny kamp
          </p>
          <form className="flex flex-col gap-4 p-4">
            <input
              type="text"
              required
              placeholder="Kamp navn"
              className="bg-[#f8f9fa] border border-[#ced4da] rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#004080]"
            />
            <input
              type="text"
              required
              placeholder="#1 Spiller ID"
              className="bg-[#f8f9fa] border border-[#ced4da] rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#004080]"
            />
            <input
              type="text"
              required
              placeholder="#2 Spiller ID"
              className="bg-[#f8f9fa] border border-[#ced4da] rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-[#004080]"
            />

            <button
              type="submit"
              className="bg-[#004080] text-white px-4 py-2 rounded hover:bg-[#003366]"
            >
              Opret kamp {/* Add saveable button */}
            </button>
            <div className="border-b-2 border-[#495057]"></div>
            <div className="w-full h-110 rounded-lg bg-[#495057]">
              {/* Add match list */}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
