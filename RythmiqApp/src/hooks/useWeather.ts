import { useState, useEffect } from 'react';
import { WeatherData } from '../services/weatherService';

export const useWeather = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      // Dummy data until API key activates
      const dummyData: WeatherData = {
        temp: 34,
        feelsLike: 38,
        humidity: 72,
        description: 'partly cloudy',
        windSpeed: 4.5,
        icon: '02d',
        city: 'Karachi',
      };
      setWeather(dummyData);
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