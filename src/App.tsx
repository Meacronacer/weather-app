import { useState } from "react";
import SearchBar from "./components/searchBar";

export default function App() {
  const [searchCity, setSearchCity] = useState("");
  return (
    <main className="flex flex-col items-center h-screen w-full bg-indigo-500">
      <h1 className="text-3xl font-bold underline text-white/90 mt-10">
        Weather App!
      </h1>

      <section className="mt-10">
        <SearchBar onSearch={setSearchCity} />
      </section>
    </main>
  );
}
