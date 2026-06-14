import { useState, useEffect } from 'react';
import { WeatherData } from '../services/weatherService';
import { getClaudeAdvice, AIAdviceResponse } from '../services/claudeService';

export const useClaudeAI = (
  weather: WeatherData | null,
  sleepHours: number,
  energyLevel: number
) => {
  const [advice, setAdvice] = useState<AIAdviceResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchAdvice = async () => {
    if (!weather) return;
    try {
      setLoading(true);
      const result = await getClaudeAdvice(weather, sleepHours, energyLevel);
      setAdvice(result);
    } catch (error) {
      console.error('AI advice error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (weather) fetchAdvice();
  }, [weather, sleepHours, energyLevel]);

  return { advice, loading, refetch: fetchAdvice };
};