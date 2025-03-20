import Navigation from "@/components/Navigation/Navigation";

export default function Home() {
  return (
    <div className="w-5/6 mx-auto flex flex-col items-center justify-items-center min-h-screen gap-12 font-[family-name:var(--font-geist-sans)]">
      <Navigation />
      <main className="w-full flex flex-col gap-32 text-center">
        <div className="flex flex-col gap-2 items-center">
          <h2 className="text-xl font-bold">Spurningaleikur</h2>
          <p className="">Hæ velkomin á þessa spurningasíðu. Veldu flokkatakkann til að skoða spurningaflokkana!</p>
        </div>
      </main>
    </div>
  );
}