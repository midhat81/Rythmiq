import { WeatherData } from './weatherService';

export interface AIDecision {
  shouldGoOut: boolean;
  energyLevel: number;
  advice: string;
  activities: string[];
  warnings: string[];
  bestTimeWindow: string;
}

export const getAIDecision = (
  weather: WeatherData,
  sleepHours: number = 7,
  lastActivityHours: number = 24
): AIDecision => {
  const decisions: AIDecision = {
    shouldGoOut: false,
    energyLevel: 100,
    advice: '',
    activities: [],
    warnings: [],
    bestTimeWindow: '',
  };

  // Energy calculation
  let energy = 100;
  if (sleepHours < 5) energy -= 40;
  else if (sleepHours < 6) energy -= 25;
  else if (sleepHours < 7) energy -= 10;
  if (weather.temp > 35) energy -= 20;
  if (weather.humidity > 80) energy -= 15;
  if (lastActivityHours < 12) energy -= 10;
  decisions.energyLevel = Math.max(0, Math.min(100, energy));

  // Weather warnings
  if (weather.temp > 40) decisions.warnings.push('🌡️ Extreme heat — avoid going outside');
  if (weather.temp > 35) decisions.warnings.push('☀️ Very hot — stay hydrated');
  if (weather.humidity > 85) decisions.warnings.push('💧 Very high humidity — uncomfortable outside');
  if (weather.windSpeed > 15) decisions.warnings.push('💨 Strong winds — be careful outside');

  // Should go out decision
  if (weather.temp <= 32 && weather.humidity <= 75 && weather.windSpeed <= 12) {
    decisions.shouldGoOut = true;
  }

  // Activity recommendations
  if (decisions.energyLevel >= 80 && decisions.shouldGoOut) {
    decisions.activities = ['🥾 Hiking', '🏃 Running', '🚴 Cycling'];
  } else if (decisions.energyLevel >= 60 && decisions.shouldGoOut) {
    decisions.activities = ['🚶 Walking', '🧘 Outdoor yoga', '🌿 Nature walk'];
  } else if (decisions.energyLevel >= 40) {
    decisions.activities = ['🧘 Indoor yoga', '📚 Reading', '🎵 Music'];
  } else {
    decisions.activities = ['😴 Rest', '💤 Nap', '🛁 Relaxing bath'];
  }

  // Best time window
  if (weather.temp > 30) {
    decisions.bestTimeWindow = '6:00 AM - 8:00 AM or after 7:00 PM';
  } else if (weather.temp > 25) {
    decisions.bestTimeWindow = '7:00 AM - 10:00 AM or after 6:00 PM';
  } else {
    decisions.bestTimeWindow = 'Anytime today is good!';
  }

  // Main advice
  if (!decisions.shouldGoOut) {
    decisions.advice = '🏠 Better to stay indoors today. Weather is not ideal.';
  } else if (decisions.energyLevel >= 80) {
    decisions.advice = '🔥 Great day! You have high energy and good weather!';
  } else if (decisions.energyLevel >= 60) {
    decisions.advice = '👍 Good day for moderate activity. Pace yourself.';
  } else {
    decisions.advice = '😴 Low energy today. Light activities only.';
  }

  return decisions;
};