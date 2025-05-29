import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { WeatherData } from "../redux/slices/weatherSlice";

const API_KEY = process.env.REACT_APP_WEATHER_SECRET_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export const fetchWeatherForecast = createAsyncThunk<
  { city: string; forecast: WeatherData[] },
  string,
  { rejectValue: string }
>("weather/fetchForecast", async (city, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: { q: city, appid: API_KEY, units: "metric" },
    });

    const forecast: WeatherData[] = response.data.list.map((item: any) => ({
      date: item.dt_txt,
      maxTemp: item.main.temp_max,
    }));

    return {
      city: response.data.city.name,
      forecast,
    };
  } catch (err) {
    const error = err as ApiError;
    const errorMessage =
      error.response?.data?.message || "Failed to fetch weather data";
    return rejectWithValue(errorMessage);
  }
});
