import React, { useState } from "react";

interface props {
  onSearch: (city: string) => void;
}

const SearchBar: React.FC<props> = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) onSearch(city);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <div className="w-full relative">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="flex-1 p-2 border w-full border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {city && (
          <div
            onClick={() => setCity("")}
            className="absolute right-2 top-0.5 cursor-pointer text-2xl"
          >
            x
          </div>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
