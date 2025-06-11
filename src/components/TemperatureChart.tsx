import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { MeasureInfo } from "@/pages/AddMeasure";

interface ChartProps {
  data?: MeasureInfo[];
}

export function TemperatureChart({ data }: ChartProps) {
  const chartData = (data || [])
    .filter((item) => item.temperature)
    .map((item) => ({
      date: item.date,
      temperature: parseFloat(item.temperature as string),
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            domain={[30, 43]}
            label={{ value: "°C", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Line type="monotone" dataKey="temperature" stroke="#8884d8" dot />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function BloodPressureChart({ data }: ChartProps) {
  const chartData = (data || [])
    .filter((item) => item.bloodPressSys && item.bloodPressDia)
    .map((item) => ({
      date: item.date,
      systolic: parseFloat(item.bloodPressSys as string),
      diastolic: parseFloat(item.bloodPressDia as string),
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            domain={[30, 200]}
            label={{ value: "mmHg", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="systolic"
            stroke="#ff7300"
            dot
            name="Systolic"
          />
          <Line
            type="monotone"
            dataKey="diastolic"
            stroke="#387908"
            dot
            name="Diastolic"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SugarLevelChart({ data }: ChartProps) {
  const chartData = (data || [])
    .filter((item) => item.sugarLevel)
    .map((item) => ({
      date: item.date,
      sugarLevel: parseFloat(item.sugarLevel as string),
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            domain={[1.5, 35]}
            label={{ value: "mmol/L", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Line type="monotone" dataKey="sugarLevel" stroke="#82ca9d" dot />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function WeightChart({ data }: ChartProps) {
  const chartData = (data || [])
    .filter((item) => item.weight)
    .map((item) => ({
      date: item.date,
      weight: parseFloat(item.weight as string),
    }))
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            domain={[3, 300]}
            label={{ value: "Kg", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Line type="monotone" dataKey="weight" stroke="#8884d8" dot />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
