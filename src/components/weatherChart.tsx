import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import dayjs from "dayjs";
import { WeatherState } from "../redux/slices/weatherSlice";

const WeatherChart: React.FC<WeatherState> = ({
  data,
  loading,
  error,
  lastSearchedCity,
}) => {
  if (!lastSearchedCity) {
    return <p className="text-center">Enter a city name and press «Search».</p>;
  }

  if (loading) {
    return <p className="text-center">Data loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  if (!data || data.length === 0) {
    return <p className="text-center">There is no data to display.</p>;
  }

  const chartData = data.map((item) => ({
    date: item.date,
    temp: item.maxTemp,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
        margin={{ top: 20, right: 30, left: 0, bottom: 30 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickFormatter={(value) => dayjs(value).format("DD MMM HH:mm")}
          angle={-45}
          textAnchor="end"
          height={60}
        />
        <YAxis unit="°C" />
        <Tooltip
          labelFormatter={(value) => dayjs(value).format("DD MMM YYYY HH:mm")}
          formatter={(value: number) => [`${value}°C`, "Max. temperature"]}
        />
        <Bar dataKey="temp" name="Max. temperature" fill="#3b82f6" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default WeatherChart;
