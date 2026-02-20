import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function HourlyChart({ times, temps }: { times: string[]; temps: number[] }) {
  const data = times.slice(0, 24).map((t, i) => ({ t, Temperature: temps[i] }));
  return (
    <div className="card">
      <h4>Today's Hourly Forecast(UTC)</h4>
      <div style={{ width: '100%', height: 280 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="t" tickFormatter={(v: string) => v.slice(11, 16)} />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="Temperature" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}