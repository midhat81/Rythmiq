import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../constants/colors';
import { useWeather } from '../hooks/useWeather';
import { useAI } from '../hooks/useAI';

const { width } = Dimensions.get('window');

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
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getGreetingEmoji = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '☀️';
    if (hour < 17) return '🌤️';
    return '🌙';
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HERO SECTION */}
        <LinearGradient
          colors={['#0a1628', '#051020', '#000000']}
          style={styles.hero}
        >
          {/* Top Bar */}
          <View style={styles.topBar}>
            <View>
              <Text style={styles.appName}>RYTHMIQ</Text>
              <Text style={styles.topDate}>
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
            </View>
            <View style={styles.notifBtn}>
              <Text style={styles.notifIcon}>🔔</Text>
            </View>
          </View>

          {/* Hero Greeting */}
          <View style={styles.heroContent}>
            <Text style={styles.greetingEmoji}>{getGreetingEmoji()}</Text>
            <Text style={styles.greeting}>{getGreeting()},</Text>
            <Text style={styles.heroName}>Muhammad</Text>
            <Text style={styles.heroSubtitle}>
              Your AI has analyzed today's conditions
            </Text>
          </View>

          {/* Hero Weather Big Display */}
          {weather && (
            <LinearGradient
              colors={['rgba(45,142,255,0.2)', 'rgba(0,198,255,0.05)']}
              style={styles.heroWeatherCard}
            >
              <View style={styles.heroWeatherLeft}>
                <Text style={styles.heroWeatherEmoji}>
                  {getWeatherEmoji(weather.description)}
                </Text>
                <Text style={styles.heroTemp}>{weather.temp}°</Text>
                <Text style={styles.heroWeatherDesc}>{weather.description}</Text>
                <Text style={styles.heroCity}>📍 {weather.city}</Text>
              </View>
              <View style={styles.heroWeatherRight}>
                <View style={styles.heroStat}>
                  <Text style={styles.heroStatValue}>{weather.humidity}%</Text>
                  <Text style={styles.heroStatLabel}>💧 Humidity</Text>
                </View>
                <View style={styles.heroStat}>
                  <Text style={styles.heroStatValue}>{weather.windSpeed}</Text>
                  <Text style={styles.heroStatLabel}>💨 Wind</Text>
                </View>
                <View style={styles.heroStat}>
                  <Text style={styles.heroStatValue}>{weather.feelsLike}°</Text>
                  <Text style={styles.heroStatLabel}>🌡️ Feels</Text>
                </View>
              </View>
            </LinearGradient>
          )}

          {loading && (
            <ActivityIndicator color={colors.primary} size="large" style={{ marginTop: 20 }} />
          )}

        </LinearGradient>

        {/* AI DECISION BANNER */}
        {decision && (
          <LinearGradient
            colors={decision.shouldGoOut
              ? ['#00e676', '#00c6ff']
              : ['#ff5252', '#ff6b9d']}
            style={styles.aiBanner}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.aiBannerEmoji}>
              {decision.shouldGoOut ? '✅' : '🏠'}
            </Text>
            <View style={styles.aiBannerText}>
              <Text style={styles.aiBannerTitle}>
                {decision.shouldGoOut ? 'Perfect Day Outside!' : 'Stay Indoors Today'}
              </Text>
              <Text style={styles.aiBannerSub}>{decision.advice}</Text>
            </View>
          </LinearGradient>
        )}

        {/* CARDS SECTION */}
        <View style={styles.cardsSection}>

          {/* Best Time Window */}
          {decision && (
            <View style={styles.timeCard}>
              <LinearGradient
                colors={['#2d8eff22', '#00c6ff11']}
                style={styles.timeCardInner}
              >
                <Text style={styles.timeCardLabel}>⏰ BEST TIME WINDOW</Text>
                <Text style={styles.timeCardValue}>{decision.bestTimeWindow}</Text>
              </LinearGradient>
            </View>
          )}

          {/* Energy + Sleep Row */}
          <View style={styles.row}>

            {/* Energy Card */}
            <View style={styles.glassCard}>
              <Text style={styles.glassCardLabel}>ENERGY</Text>
              {decision && (
                <>
                  <Text style={[styles.glassCardBig, {
                    color: getEnergyColor(decision.energyLevel)
                  }]}>
                    {decision.energyLevel}%
                  </Text>
                  <View style={styles.miniBar}>
                    <LinearGradient
                      colors={[colors.primary, colors.secondary]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={[styles.miniBarFill, {
                        width: `${decision.energyLevel}%` as any
                      }]}
                    />
                  </View>
                  <Text style={styles.glassCardSub}>
                    {decision.energyLevel >= 80 ? '🔥 High' :
                      decision.energyLevel >= 50 ? '⚡ Medium' : '😴 Low'}
                  </Text>
                </>
              )}
            </View>

            {/* Sleep Card */}
            <View style={styles.glassCard}>
              <Text style={styles.glassCardLabel}>SLEEP</Text>
              <Text style={styles.glassCardBig}>
                {sleepHours}h
              </Text>
              <Text style={styles.glassCardEmoji}>😴</Text>
              <View style={styles.sleepBtns}>
              <TouchableOpacity
                style={styles.sleepBtn}
                activeOpacity={0.7}
                onPress={() => setSleepHours(Math.max(0, sleepHours - 1))}
              >
                <Text style={styles.sleepBtnTxt}>−</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.sleepBtn}
                activeOpacity={0.7}
                onPress={() => setSleepHours(Math.min(12, sleepHours + 1))}
              >
                <Text style={styles.sleepBtnTxt}>+</Text>
              </TouchableOpacity>
            </View>
            </View>

          </View>

          {/* Activities Card */}
          <View style={styles.activitiesCard}>
            <Text style={styles.activitiesTitle}>🎯 Recommended For You</Text>
            <View style={styles.activitiesRow}>
              {decision?.activities.map((activity, index) => (
                <LinearGradient
                  key={index}
                  colors={
                    index === 0 ? ['#2d8eff', '#00c6ff'] :
                    index === 1 ? ['#bf5af2', '#7c6fff'] :
                    ['#00e676', '#00c6ff']
                  }
                  style={styles.activityCard}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.activityText}>{activity}</Text>
                </LinearGradient>
              ))}
            </View>
          </View>

          {/* Warnings */}
          {decision && decision.warnings.length > 0 && (
            <View style={styles.warningCard}>
              <Text style={styles.warningTitle}>⚠️ Today's Warnings</Text>
              {decision.warnings.map((warning, index) => (
                <View key={index} style={styles.warningRow}>
                  <Text style={styles.warningDot}>•</Text>
                  <Text style={styles.warningText}>{warning}</Text>
                </View>
              ))}
            </View>
          )}

        </View>

        <View style={{ height: 100 }} />

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  hero: {
    paddingBottom: 30,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 10,
  },
  appName: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.primary,
    letterSpacing: 4,
  },
  topDate: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  notifBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  notifIcon: {
    fontSize: 18,
  },
  heroContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  greetingEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  greeting: {
    fontSize: 16,
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
  heroName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: 2,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 13,
    color: colors.textMuted,
  },
  heroWeatherCard: {
    marginHorizontal: 20,
    borderRadius: 24,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary + '33',
  },
  heroWeatherLeft: {
    flex: 1,
  },
  heroWeatherEmoji: {
    fontSize: 48,
    marginBottom: 4,
  },
  heroTemp: {
    fontSize: 52,
    fontWeight: 'bold',
    color: colors.textPrimary,
    lineHeight: 56,
  },
  heroWeatherDesc: {
    fontSize: 14,
    color: colors.textSecondary,
    textTransform: 'capitalize',
    marginTop: 4,
  },
  heroCity: {
    fontSize: 12,
    color: colors.primary,
    marginTop: 6,
  },
  heroWeatherRight: {
    gap: 16,
    alignItems: 'flex-end',
  },
  heroStat: {
    alignItems: 'flex-end',
  },
  heroStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  heroStatLabel: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  aiBanner: {
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  aiBannerEmoji: {
    fontSize: 32,
  },
  aiBannerText: {
    flex: 1,
  },
  aiBannerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  aiBannerSub: {
    fontSize: 12,
    color: '#00000099',
    marginTop: 2,
  },
  cardsSection: {
    padding: 20,
    gap: 12,
  },
  timeCard: {
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.primary + '33',
  },
  timeCardInner: {
    padding: 16,
  },
  timeCardLabel: {
    fontSize: 10,
    color: colors.textMuted,
    letterSpacing: 2,
    marginBottom: 6,
  },
  timeCardValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  glassCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  glassCardLabel: {
    fontSize: 10,
    color: colors.textMuted,
    letterSpacing: 2,
    marginBottom: 8,
    fontWeight: '600',
  },
  glassCardBig: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  glassCardEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  glassCardSub: {
    fontSize: 12,
    color: colors.textMuted,
  },
  miniBar: {
    height: 4,
    backgroundColor: colors.glassBorder,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 8,
  },
  miniBarFill: {
    height: '100%',
    borderRadius: 2,
  },
  sleepBtns: {
    flexDirection: 'row',
    gap: 8,
  },
  sleepBtn: {
    backgroundColor: colors.glassBorder,
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sleepBtnTxt: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  activitiesCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  activitiesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  activitiesRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  activityCard: {
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  activityText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  warningCard: {
    backgroundColor: colors.warning + '15',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.warning + '33',
  },
  warningTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.warning,
    marginBottom: 10,
  },
  warningRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 6,
  },
  warningDot: {
    color: colors.warning,
    fontSize: 16,
  },
  warningText: {
    fontSize: 13,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 20,
  },
});