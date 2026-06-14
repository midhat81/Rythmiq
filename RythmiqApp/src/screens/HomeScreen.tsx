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
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greeting}>{getGreeting()}</Text>
          <Text style={styles.name}>Muhammad</Text>
          <Text style={styles.date}>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </View>

        {/* Weather + AI Row */}
        <View style={styles.row}>

          {/* Weather Card */}
          <View style={styles.halfCard}>
            <Text style={styles.cardLabel}>WEATHER</Text>
            {loading ? (
              <ActivityIndicator color={colors.primary} size="small" />
            ) : weather ? (
              <View>
                <Text style={styles.weatherEmoji}>
                  {getWeatherEmoji(weather.description)}
                </Text>
                <Text style={styles.weatherTemp}>{weather.temp}°</Text>
                <Text style={styles.weatherDesc}>{weather.description}</Text>
                <Text style={styles.city}>📍 {weather.city}</Text>
              </View>
            ) : null}
          </View>

          {/* AI Decision Card */}
          <View style={styles.halfCard}>
            <Text style={styles.cardLabel}>AI SAYS</Text>
            {decision ? (
              <View>
                <Text style={styles.shouldGoOutEmoji}>
                  {decision.shouldGoOut ? '✅' : '🏠'}
                </Text>
                <Text style={[styles.shouldGoOutText, {
                  color: decision.shouldGoOut ? colors.success : colors.danger
                }]}>
                  {decision.shouldGoOut ? 'Go Outside!' : 'Stay Indoors'}
                </Text>
                <Text style={styles.timeWindow}>
                  ⏰ {decision.bestTimeWindow}
                </Text>
              </View>
            ) : (
              <ActivityIndicator color={colors.primary} size="small" />
            )}
          </View>

        </View>

        {/* Weather Stats */}
        {weather && (
          <View style={styles.statsCard}>
            <View style={styles.statBox}>
              <Text style={styles.statEmoji}>💧</Text>
              <Text style={styles.statValue}>{weather.humidity}%</Text>
              <Text style={styles.statLabel}>Humidity</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statEmoji}>💨</Text>
              <Text style={styles.statValue}>{weather.windSpeed}</Text>
              <Text style={styles.statLabel}>Wind m/s</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statEmoji}>🌡️</Text>
              <Text style={styles.statValue}>{weather.feelsLike}°</Text>
              <Text style={styles.statLabel}>Feels Like</Text>
            </View>
          </View>
        )}

        {/* Energy + Sleep Row */}
        <View style={styles.row}>

          {/* Energy Card */}
          <View style={styles.halfCard}>
            <Text style={styles.cardLabel}>ENERGY</Text>
            {decision ? (
              <View>
                <Text style={[styles.energyValue, {
                  color: getEnergyColor(decision.energyLevel)
                }]}>
                  {decision.energyLevel}%
                </Text>
                <View style={styles.energyBar}>
                  <LinearGradient
                    colors={[colors.primary, colors.purple]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.energyFill, {
                      width: `${decision.energyLevel}%` as any
                    }]}
                  />
                </View>
                <Text style={styles.energyLabel}>
                  {decision.energyLevel >= 80 ? 'High Energy 🔥' :
                    decision.energyLevel >= 50 ? 'Moderate ⚡' : 'Low Energy 😴'}
                </Text>
              </View>
            ) : null}
          </View>

          {/* Sleep Card */}
          <View style={styles.halfCard}>
            <Text style={styles.cardLabel}>SLEEP</Text>
            <Text style={styles.sleepValue}>😴</Text>
            <Text style={styles.sleepHours}>{sleepHours}h</Text>
            <View style={styles.sleepControls}>
              <TouchableOpacity
                style={styles.sleepBtn}
                onPress={() => setSleepHours(Math.max(0, sleepHours - 1))}
              >
                <Text style={styles.sleepBtnText}>−</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.sleepBtn}
                onPress={() => setSleepHours(Math.min(12, sleepHours + 1))}
              >
                <Text style={styles.sleepBtnText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>

        {/* Warnings */}
        {decision && decision.warnings.length > 0 && (
          <View style={[styles.fullCard, { borderColor: colors.warning + '44' }]}>
            <Text style={styles.cardLabel}>⚠️ WARNINGS</Text>
            {decision.warnings.map((warning, index) => (
              <Text key={index} style={styles.warningText}>{warning}</Text>
            ))}
          </View>
        )}

        {/* Activities */}
        <View style={styles.fullCard}>
          <Text style={styles.cardLabel}>🎯 RECOMMENDED</Text>
          <View style={styles.activitiesGrid}>
            {decision?.activities.map((activity, index) => (
              <View key={index} style={[styles.activityChip, {
                borderColor: index === 0 ? colors.primary :
                  index === 1 ? colors.purple : colors.success,
              }]}>
                <Text style={[styles.activityText, {
                  color: index === 0 ? colors.primary :
                    index === 1 ? colors.purple : colors.success,
                }]}>{activity}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* AI Advice */}
        <View style={styles.fullCard}>
          <Text style={styles.cardLabel}>🧠 AI ADVICE</Text>
          <Text style={styles.adviceText}>{decision?.advice}</Text>
        </View>

        <View style={{ height: 100 }} />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 14,
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: 2,
  },
  date: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 4,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 12,
  },
  halfCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  fullCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  statsCard: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  cardLabel: {
    fontSize: 10,
    color: colors.textMuted,
    letterSpacing: 2,
    marginBottom: 10,
    fontWeight: '600',
  },
  weatherEmoji: {
    fontSize: 36,
    marginBottom: 6,
  },
  weatherTemp: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  weatherDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    textTransform: 'capitalize',
    marginTop: 2,
  },
  city: {
    fontSize: 11,
    color: colors.primary,
    marginTop: 6,
  },
  shouldGoOutEmoji: {
    fontSize: 36,
    marginBottom: 6,
  },
  shouldGoOutText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  timeWindow: {
    fontSize: 10,
    color: colors.textMuted,
    lineHeight: 15,
  },
  statBox: {
    alignItems: 'center',
  },
  statEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.glassBorder,
  },
  energyValue: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  energyBar: {
    height: 6,
    backgroundColor: colors.glassBorder,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  energyFill: {
    height: '100%',
    borderRadius: 3,
  },
  energyLabel: {
    fontSize: 11,
    color: colors.textMuted,
  },
  sleepValue: {
    fontSize: 32,
    marginBottom: 2,
  },
  sleepHours: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 10,
  },
  sleepControls: {
    flexDirection: 'row',
    gap: 8,
  },
  sleepBtn: {
    backgroundColor: colors.glassBorder,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sleepBtnText: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  warningText: {
    fontSize: 13,
    color: colors.warning,
    marginBottom: 4,
    lineHeight: 20,
  },
  activitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  activityChip: {
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 1,
    backgroundColor: colors.glassBorder + '44',
  },
  activityText: {
    fontSize: 13,
    fontWeight: '500',
  },
  adviceText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
  },
});