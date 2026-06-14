import { useState, useEffect } from 'react';
import { WeatherData } from '../services/weatherService';
import { getAIDecision, AIDecision } from '../services/aiService';

export const useAI = (weather: WeatherData | null) => {
  const [decision, setDecision] = useState<AIDecision | null>(null);
  const [sleepHours, setSleepHours] = useState(7);

  useEffect(() => {
    if (weather) {
      const result = getAIDecision(weather, sleepHours);
      setDecision(result);
    }
  }, [weather, sleepHours]);

  return { decision, sleepHours, setSleepHours };
};