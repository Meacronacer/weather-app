import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchWeatherForecast } from "../../api/weatherApi";

export interface WeatherData {
  date: string;
  maxTemp: number;
}

interface WeatherState {
  data: WeatherData[] | null;
  loading: boolean;
  error: string | null;
  lastSearchedCity: string;
}

const initialState: WeatherState = {
  data: null,
  loading: false,
  error: null,
  lastSearchedCity: "",
};

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherForecast.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchWeatherForecast.fulfilled,
        (
          state,
          action: PayloadAction<{ city: string; forecast: WeatherData[] }>
        ) => {
          state.loading = false;
          state.data = action.payload.forecast;
          state.lastSearchedCity = action.payload.city;
        }
      )
      .addCase(
        fetchWeatherForecast.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to fetch weather data";
        }
      );
  },
});

export default weatherSlice.reducer;
