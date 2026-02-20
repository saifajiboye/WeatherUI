import { useEffect, useMemo, useState } from 'react';
import { fetchWeather, type WeatherResponse } from './api/weather';
import { useDebounce } from './hooks/useDebounce';
import HourlyChart from './components/HourlyChart';
import './App.css';

export default function App() {
  const [query, setQuery] = useState('');
  const debounced = useDebounce(query, 600);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const city = debounced.trim();
    if (city.length < 2) {
      setData(null);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    fetchWeather(city)
      .then((d) => setData(d))
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [debounced]);

  const hourly = useMemo(
    () => ({
      times: data?.forecast?.hourly?.time ?? [],
      temps: data?.forecast?.hourly?.temperature_2m ?? []
    }),
    [data]
  );

  return (
    <div className="container">
      <h2>Weather Dashboard</h2>

      <input
        className="input"
        placeholder="Type a city… (e.g., Lagos, Salt Lake City)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && <div className="spinner">Loading…</div>}
      {error && <div className="error">⚠️ {error}</div>}

      {data && !loading && (
        <section className="card">
          <h3>{data.city}, {data.country}</h3>
          {data.forecast?.current_weather && (
            <p>
              Now: {data.forecast.current_weather.temperature}°C · {((data.forecast.current_weather.temperature * 9/5) + 32).toFixed(1)}°F · Wind {data.forecast.current_weather.windspeed} km/h <br/> {data.city}: {data.cityTime} · UTC: {data.UTCTime}
            </p>
          )}

          {hourly.times.length > 0 && hourly.temps.length > 0 && (
            <HourlyChart times={hourly.times} temps={hourly.temps} />
          )}
        </section>
      )}
      <p>Developed using React, Aws Lambda and SpringBoot</p>
    </div>
  );
}