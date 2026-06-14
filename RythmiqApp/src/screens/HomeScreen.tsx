import { StyleSheet, Text, View, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { colors } from '../constants/colors';
import { config } from '../constants/config';
import { useWeather } from '../hooks/useWeather';

export default function HomeScreen() {
  const { weather, loading, error, refetch } = useWeather();

  const getWeatherEmoji = (description: string) => {
    if (description.includes('rain')) return '🌧️';
    if (description.includes('cloud')) return '⛅';
    if (description.includes('clear')) return '☀️';
    if (description.includes('snow')) return '❄️';
    if (description.includes('storm')) return '⛈️';
    return '🌤️';
  };

  const getAIAdvice = (temp: number, humidity: number, windSpeed: number) => {
    if (temp > 35) return '🥵 Too hot for outdoor activity. Stay hydrated and rest indoors.';
    if (temp > 28) return '⚠️ Warm outside. Best time to walk is early morning 6-8 AM.';
    if (temp < 10) return '🥶 Too cold outside. Wear warm clothes if going out.';
    if (humidity > 80) return '💧 High humidity today. Avoid intense outdoor exercise.';
    if (windSpeed > 10) return '💨 Strong winds today. Be careful if going outside.';
    return '✅ Perfect weather! Great time for outdoor activity.';
  };

  return (
    <ScrollView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Good Morning 👋</Text>
        <Text style={styles.name}>Muhammad</Text>
      </View>

      {/* Weather Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Weather Now</Text>
        {loading ? (
          <ActivityIndicator color={colors.primary} size="large" />
        ) : error ? (
          <View>
            <Text style={styles.errorText}>Failed to load weather</Text>
            <TouchableOpacity onPress={refetch} style={styles.retryBtn}>
              <Text style={styles.retryText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : weather ? (
          <View>
            <Text style={styles.weatherEmoji}>
              {getWeatherEmoji(weather.description)}
            </Text>
            <Text style={styles.weatherTemp}>{weather.temp}°C</Text>
            <Text style={styles.weatherDesc}>{weather.description}</Text>
            <Text style={styles.weatherDetails}>
              💧 {weather.humidity}%  💨 {weather.windSpeed}m/s  🌡️ Feels {weather.feelsLike}°C
            </Text>
            <Text style={styles.city}>📍 {weather.city}</Text>
          </View>
        ) : null}
      </View>

      {/* AI Advice Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🧠 AI Advice</Text>
        <Text style={styles.advice}>
          {weather
            ? getAIAdvice(weather.temp, weather.humidity, weather.windSpeed)
            : 'Loading advice...'}
        </Text>
      </View>

      {/* Energy Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🔋 Your Energy Today</Text>
        <Text style={styles.energy}>75%</Text>
        <Text style={styles.energyDesc}>
          Good energy level — moderate activity recommended
        </Text>
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  header: {
    marginTop: 60,
    marginBottom: 30,
  },
  greeting: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  cardTitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 10,
  },
  weatherEmoji: {
    fontSize: 48,
    marginBottom: 5,
  },
  weatherTemp: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  weatherDesc: {
    fontSize: 16,
    color: colors.textSecondary,
    textTransform: 'capitalize',
  },
  weatherDetails: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 8,
  },
  city: {
    fontSize: 14,
    color: colors.primary,
    marginTop: 5,
  },
  advice: {
    fontSize: 16,
    color: colors.textPrimary,
    lineHeight: 24,
  },
  energy: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.success,
  },
  energyDesc: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 5,
  },
  errorText: {
    color: colors.danger,
    fontSize: 16,
  },
  retryBtn: {
    marginTop: 10,
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  retryText: {
    color: colors.textPrimary,
    fontWeight: 'bold',
  },
});