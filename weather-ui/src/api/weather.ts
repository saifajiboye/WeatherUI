export type WeatherResponse = {
  city: string;
  country: string;
  forecast: {
    current_weather?: { temperature: number; windspeed: number };
    hourly?: { time: string[]; temperature_2m: number[] };
  };
  cityTime: string;
  UTCTime: string;
};

export async function fetchWeather(city: string): Promise<WeatherResponse> {
  const res = await fetch('https://fjtuwjmqnodjdw7rpobum247g40yamtq.lambda-url.us-east-1.on.aws', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: city
  });
  if (!res.ok) {
    const msg = (await res.json().catch(() => null))?.message || res.statusText;
    throw new Error(msg || 'Failed to fetch');
  }
  return res.json();
}