import axios from 'axios';
import { WeatherData } from './weatherService';

const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';
const CLAUDE_API_KEY = 'YOUR_CLAUDE_API_KEY'; // We will add this later

export interface AIAdviceResponse {
  morningAdvice: string;
  energyTip: string;
  activityPlan: string;
  weatherWarning: string;
  motivationalMessage: string;
}

export const getClaudeAdvice = async (
  weather: WeatherData,
  sleepHours: number,
  energyLevel: number
): Promise<AIAdviceResponse> => {
  const prompt = `
You are Rythmiq, a personal AI life assistant. 
Analyze this data and give personalized advice:

Weather: ${weather.temp}°C, ${weather.description}
Humidity: ${weather.humidity}%
Wind: ${weather.windSpeed}m/s
Sleep last night: ${sleepHours} hours
Current energy level: ${energyLevel}%
City: ${weather.city}

Respond ONLY in this exact JSON format:
{
  "morningAdvice": "one sentence morning advice",
  "energyTip": "one sentence energy tip",
  "activityPlan": "one sentence activity recommendation",
  "weatherWarning": "one sentence weather warning or empty string",
  "motivationalMessage": "one short motivational sentence"
}
`;

  try {
    const response = await axios.post(
      CLAUDE_API_URL,
      {
        model: 'claude-sonnet-4-6',
        max_tokens: 500,
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          'x-api-key': CLAUDE_API_KEY,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json',
        },
      }
    );

    const text = response.data.content[0].text;
    const json = JSON.parse(text);
    return json;
  } catch (error) {
    // Fallback if API fails
    return {
      morningAdvice: `Good morning! Temperature is ${weather.temp}°C today.`,
      energyTip: sleepHours >= 7 ? 'Great sleep! You have good energy today.' : 'Try to rest more today.',
      activityPlan: weather.temp > 32 ? 'Stay indoors, best time to go out is early morning.' : 'Good weather for outdoor activity!',
      weatherWarning: weather.temp > 35 ? 'Extreme heat warning! Stay hydrated.' : '',
      motivationalMessage: 'Every day is a new opportunity to be your best self!',
    };
  }
};