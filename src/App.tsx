import React from "react";
import { fetchWeatherForecast } from "./api/weatherApi";
import SearchBar from "./components/searchBar";
import WeatherChart from "./components/weatherChart";
import { useAppDispatch, useAppSelector } from "./hooks/useRedux";

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { data, loading, error, lastSearchedCity } = useAppSelector(
    (state) => state.weather
  );

  const handleSearch = (city: string) => {
    dispatch(fetchWeatherForecast(city));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          5-Day Weather Forecast
        </h1>

        <SearchBar onSearch={handleSearch} />

        <WeatherChart
          data={data}
          loading={loading}
          error={error}
          lastSearchedCity={lastSearchedCity}
        />
      </div>
    </div>
  );
};

export default App;
