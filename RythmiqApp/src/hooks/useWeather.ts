import { useState, useEffect } from 'react';
import { getWeather, WeatherData } from '../services/weatherService';
import { config } from '../constants/config';

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      const data = await getWeather(config.defaultCity);
      setWeather(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch weather');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return { weather, loading, error, refetch: fetchWeather };
};