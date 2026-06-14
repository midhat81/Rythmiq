import { config } from '../constants/config';

export interface WeatherData {
  temp: number;
  feelsLike: number;
  humidity: number;
  description: string;
  windSpeed: number;
  icon: string;
  city: string;
}

export const getWeather = async (city: string): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${config.weatherApiUrl}/weather?q=${city}&appid=${config.weatherApiKey}&units=${config.temperatureUnit}`
    );

    const data = await response.json();

    return {
      temp: Math.round(data.main.temp),
      feelsLike: Math.round(data.main.feels_like),
      humidity: data.main.humidity,
      description: data.weather[0].description,
      windSpeed: data.wind.speed,
      icon: data.weather[0].icon,
      city: data.name,
    };
  } catch (error) {
    console.error('Weather fetch error:', error);
    throw error;
  }
};