import { StyleSheet, Text, View, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { colors } from '../constants/colors';
import { useWeather } from '../hooks/useWeather';
import { useAI } from '../hooks/useAI';

export default function HomeScreen() {
  const { weather, loading, error, refetch } = useWeather();
  const { decision, sleepHours, setSleepHours } = useAI(weather);

  const getWeatherEmoji = (description: string) => {
    if (description.includes('rain')) return '🌧️';
    if (description.includes('cloud')) return '⛅';
    if (description.includes('clear')) return '☀️';
    if (description.includes('snow')) return '❄️';
    if (description.includes('storm')) return '⛈️';
    return '🌤️';
  };

  const getEnergyColor = (energy: number) => {
    if (energy >= 80) return colors.success;
    if (energy >= 50) return colors.warning;
    return colors.danger;
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
        <Text style={styles.cardTitle}>⛅ Weather Now</Text>
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

      {/* AI Decision Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🧠 AI Decision</Text>
        {decision ? (
          <View>
            <Text style={styles.shouldGoOut}>
              {decision.shouldGoOut ? '✅ Good to go outside!' : '🏠 Stay indoors today'}
            </Text>
            <Text style={styles.advice}>{decision.advice}</Text>
            <Text style={styles.timeWindow}>
              ⏰ Best time: {decision.bestTimeWindow}
            </Text>
          </View>
        ) : (
          <ActivityIndicator color={colors.primary} />
        )}
      </View>

      {/* Warnings Card */}
      {decision && decision.warnings.length > 0 && (
        <View style={[styles.card, styles.warningCard]}>
          <Text style={styles.cardTitle}>⚠️ Warnings</Text>
          {decision.warnings.map((warning, index) => (
            <Text key={index} style={styles.warningText}>{warning}</Text>
          ))}
        </View>
      )}

      {/* Energy Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🔋 Your Energy Today</Text>
        {decision ? (
          <View>
            <Text style={[styles.energy, { color: getEnergyColor(decision.energyLevel) }]}>
              {decision.energyLevel}%
            </Text>
            <Text style={styles.energyDesc}>
              Sleep: {sleepHours} hrs
            </Text>
            {/* Sleep adjuster */}
            <View style={styles.sleepRow}>
              <TouchableOpacity
                style={styles.sleepBtn}
                onPress={() => setSleepHours(Math.max(0, sleepHours - 1))}
              >
                <Text style={styles.sleepBtnText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.sleepHours}>{sleepHours} hrs sleep</Text>
              <TouchableOpacity
                style={styles.sleepBtn}
                onPress={() => setSleepHours(Math.min(12, sleepHours + 1))}
              >
                <Text style={styles.sleepBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
      </View>

      {/* Activities Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🎯 Recommended Activities</Text>
        {decision?.activities.map((activity, index) => (
          <Text key={index} style={styles.activity}>{activity}</Text>
        ))}
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
  warningCard: {
    borderColor: colors.warning,
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
  shouldGoOut: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  advice: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: 8,
  },
  timeWindow: {
    fontSize: 14,
    color: colors.primary,
  },
  warningText: {
    fontSize: 14,
    color: colors.warning,
    marginBottom: 5,
  },
  energy: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  energyDesc: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 5,
  },
  sleepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  sleepBtn: {
    backgroundColor: colors.primary,
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sleepBtnText: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: 'bold',
  },
  sleepHours: {
    color: colors.textPrimary,
    fontSize: 16,
    marginHorizontal: 16,
  },
  activity: {
    fontSize: 16,
    color: colors.textPrimary,
    marginBottom: 8,
    paddingLeft: 8,
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