import { StyleSheet, Text, View, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning ☀️';
    if (hour < 17) return 'Good Afternoon 🌤️';
    return 'Good Evening 🌙';
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Header */}
      <LinearGradient
        colors={[colors.gradientStart + '33', 'transparent']}
        style={styles.header}
      >
        <Text style={styles.greeting}>{getGreeting()}</Text>
        <Text style={styles.name}>Muhammad</Text>
        <Text style={styles.date}>
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
      </LinearGradient>

      {/* Weather Card */}
      <LinearGradient
        colors={[colors.card, colors.cardGlow]}
        style={styles.weatherCard}
      >
        <Text style={styles.cardLabel}>CURRENT WEATHER</Text>
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
            <View style={styles.weatherMain}>
              <Text style={styles.weatherEmoji}>
                {getWeatherEmoji(weather.description)}
              </Text>
              <View>
                <Text style={styles.weatherTemp}>{weather.temp}°</Text>
                <Text style={styles.weatherDesc}>{weather.description}</Text>
              </View>
            </View>
            <View style={styles.weatherStats}>
              <View style={styles.weatherStat}>
                <Text style={styles.weatherStatValue}>{weather.humidity}%</Text>
                <Text style={styles.weatherStatLabel}>Humidity</Text>
              </View>
              <View style={styles.weatherStat}>
                <Text style={styles.weatherStatValue}>{weather.windSpeed}</Text>
                <Text style={styles.weatherStatLabel}>Wind m/s</Text>
              </View>
              <View style={styles.weatherStat}>
                <Text style={styles.weatherStatValue}>{weather.feelsLike}°</Text>
                <Text style={styles.weatherStatLabel}>Feels Like</Text>
              </View>
            </View>
            <Text style={styles.city}>📍 {weather.city}</Text>
          </View>
        ) : null}
      </LinearGradient>

      {/* AI Decision Card */}
      <LinearGradient
        colors={decision?.shouldGoOut
          ? [colors.success + '22', colors.card]
          : [colors.danger + '22', colors.card]}
        style={styles.card}
      >
        <Text style={styles.cardLabel}>AI DECISION</Text>
        {decision ? (
          <View>
            <Text style={styles.shouldGoOut}>
              {decision.shouldGoOut ? '✅ Go Outside!' : '🏠 Stay Indoors'}
            </Text>
            <Text style={styles.advice}>{decision.advice}</Text>
            <View style={styles.timeWindowBox}>
              <Text style={styles.timeWindowLabel}>⏰ Best Window</Text>
              <Text style={styles.timeWindowValue}>{decision.bestTimeWindow}</Text>
            </View>
          </View>
        ) : (
          <ActivityIndicator color={colors.primary} />
        )}
      </LinearGradient>

      {/* Warnings */}
      {decision && decision.warnings.length > 0 && (
        <View style={[styles.card, styles.warningCard]}>
          <Text style={styles.cardLabel}>⚠️ WARNINGS</Text>
          {decision.warnings.map((warning, index) => (
            <Text key={index} style={styles.warningText}>{warning}</Text>
          ))}
        </View>
      )}

      {/* Energy Card */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>ENERGY LEVEL</Text>
        {decision ? (
          <View>
            <View style={styles.energyRow}>
              <Text style={[styles.energyValue, { color: getEnergyColor(decision.energyLevel) }]}>
                {decision.energyLevel}%
              </Text>
              <View style={styles.energyBar}>
                <View style={[styles.energyFill, {
                  width: `${decision.energyLevel}%` as any,
                  backgroundColor: getEnergyColor(decision.energyLevel),
                }]} />
              </View>
            </View>
            <View style={styles.sleepRow}>
              <TouchableOpacity
                style={styles.sleepBtn}
                onPress={() => setSleepHours(Math.max(0, sleepHours - 1))}
              >
                <Text style={styles.sleepBtnText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.sleepHours}>😴 {sleepHours} hrs sleep</Text>
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

      {/* Activities */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>RECOMMENDED FOR YOU</Text>
        <View style={styles.activitiesGrid}>
          {decision?.activities.map((activity, index) => (
            <View key={index} style={styles.activityChip}>
              <Text style={styles.activityText}>{activity}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={{ height: 20 }} />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 30,
  },
  greeting: {
    fontSize: 16,
    color: colors.textSecondary,
    letterSpacing: 1,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: 4,
  },
  date: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 4,
  },
  weatherCard: {
    margin: 16,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  card: {
    margin: 16,
    marginTop: 0,
    borderRadius: 20,
    padding: 24,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  warningCard: {
    borderColor: colors.warning + '66',
    backgroundColor: colors.warning + '11',
  },
  cardLabel: {
    fontSize: 11,
    color: colors.textMuted,
    letterSpacing: 2,
    marginBottom: 12,
    fontWeight: '600',
  },
  weatherMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  weatherEmoji: {
    fontSize: 56,
  },
  weatherTemp: {
    fontSize: 56,
    fontWeight: 'bold',
    color: colors.textPrimary,
    lineHeight: 60,
  },
  weatherDesc: {
    fontSize: 16,
    color: colors.textSecondary,
    textTransform: 'capitalize',
  },
  weatherStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.background + '88',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  weatherStat: {
    alignItems: 'center',
  },
  weatherStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  weatherStatLabel: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  city: {
    fontSize: 13,
    color: colors.primary,
  },
  shouldGoOut: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  advice: {
    fontSize: 15,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: 12,
  },
  timeWindowBox: {
    backgroundColor: colors.primary + '22',
    borderRadius: 10,
    padding: 10,
  },
  timeWindowLabel: {
    fontSize: 11,
    color: colors.textMuted,
    letterSpacing: 1,
  },
  timeWindowValue: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    marginTop: 2,
  },
  warningText: {
    fontSize: 14,
    color: colors.warning,
    marginBottom: 6,
  },
  energyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  energyValue: {
    fontSize: 36,
    fontWeight: 'bold',
    width: 80,
  },
  energyBar: {
    flex: 1,
    height: 8,
    backgroundColor: colors.cardBorder,
    borderRadius: 4,
    overflow: 'hidden',
  },
  energyFill: {
    height: '100%',
    borderRadius: 4,
  },
  sleepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
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
    fontWeight: '600',
  },
  activitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  activityChip: {
    backgroundColor: colors.primary + '22',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.primary + '44',
  },
  activityText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '500',
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