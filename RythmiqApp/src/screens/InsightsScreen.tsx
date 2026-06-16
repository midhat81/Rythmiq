import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../constants/colors';
import { useWeather } from '../hooks/useWeather';
import { useAI } from '../hooks/useAI';
import { useClaudeAI } from '../hooks/useClaudeAI';

export default function InsightsScreen() {
  const { weather } = useWeather();
  const { decision } = useAI(weather);
  const { advice, loading } = useClaudeAI(
    weather,
    7,
    decision?.energyLevel ?? 75
  );

  const insights = [
    {
      emoji: '🌅',
      title: 'Morning Advice',
      value: advice?.morningAdvice ?? 'Analyzing...',
      color: '#ffd60a',
      gradient: ['#ffd60a22', '#ffd60a11'] as [string, string],
    },
    {
      emoji: '⚡',
      title: 'Energy Tip',
      value: advice?.energyTip ?? 'Analyzing...',
      color: '#30d158',
      gradient: ['#30d15822', '#30d15811'] as [string, string],
    },
    {
      emoji: '🎯',
      title: 'Activity Plan',
      value: advice?.activityPlan ?? 'Analyzing...',
      color: '#0a84ff',
      gradient: ['#0a84ff22', '#0a84ff11'] as [string, string],
    },
    {
      emoji: '💪',
      title: 'Motivation',
      value: advice?.motivationalMessage ?? 'Analyzing...',
      color: '#bf5af2',
      gradient: ['#bf5af222', '#bf5af211'] as [string, string],
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HERO HEADER */}
        <LinearGradient
          colors={['#0a1628', '#051020', '#000000']}
          style={styles.hero}
        >
          <View style={styles.topBar}>
            <View>
              <Text style={styles.appName}>INSIGHTS</Text>
              <Text style={styles.topDate}>
                AI Analysis for Today
              </Text>
            </View>
            <View style={styles.aiBadge}>
              <Text style={styles.aiBadgeText}>🧠 AI</Text>
            </View>
          </View>

          {/* Hero Stats */}
          <View style={styles.heroStats}>
            <LinearGradient
              colors={['rgba(45,142,255,0.2)', 'rgba(0,198,255,0.05)']}
              style={styles.heroStatCard}
            >
              <Text style={styles.heroStatEmoji}>⛅</Text>
              <Text style={styles.heroStatValue}>{weather?.temp ?? '--'}°C</Text>
              <Text style={styles.heroStatLabel}>Temperature</Text>
            </LinearGradient>
            <LinearGradient
              colors={['rgba(48,209,88,0.2)', 'rgba(48,209,88,0.05)']}
              style={styles.heroStatCard}
            >
              <Text style={styles.heroStatEmoji}>🔋</Text>
              <Text style={styles.heroStatValue}>{decision?.energyLevel ?? '--'}%</Text>
              <Text style={styles.heroStatLabel}>Energy</Text>
            </LinearGradient>
            <LinearGradient
              colors={['rgba(191,90,242,0.2)', 'rgba(191,90,242,0.05)']}
              style={styles.heroStatCard}
            >
              <Text style={styles.heroStatEmoji}>💧</Text>
              <Text style={styles.heroStatValue}>{weather?.humidity ?? '--'}%</Text>
              <Text style={styles.heroStatLabel}>Humidity</Text>
            </LinearGradient>
          </View>

        </LinearGradient>

        {/* AI STATUS */}
        <View style={styles.section}>
          {loading ? (
            <LinearGradient
              colors={['#2d8eff22', '#00c6ff11']}
              style={styles.loadingCard}
            >
              <ActivityIndicator color={colors.primary} size="large" />
              <Text style={styles.loadingTitle}>AI is thinking...</Text>
              <Text style={styles.loadingSubtitle}>
                Analyzing your weather, energy and sleep data
              </Text>
            </LinearGradient>
          ) : (
            <LinearGradient
              colors={['#30d15822', '#30d15811']}
              style={styles.aiReadyCard}
            >
              <Text style={styles.aiReadyEmoji}>✅</Text>
              <Text style={styles.aiReadyText}>AI Analysis Complete</Text>
            </LinearGradient>
          )}
        </View>

        {/* WARNING CARD */}
        {advice?.weatherWarning !== '' && advice?.weatherWarning && (
          <View style={styles.section}>
            <LinearGradient
              colors={['#ff9500 22', '#ff950011']}
              style={styles.warningCard}
            >
              <Text style={styles.warningTitle}>⚠️ Weather Warning</Text>
              <Text style={styles.warningText}>{advice.weatherWarning}</Text>
            </LinearGradient>
          </View>
        )}

        {/* INSIGHT CARDS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Today's Insights</Text>
          {insights.map((insight, index) => (
            <LinearGradient
              key={index}
              colors={insight.gradient}
              style={styles.insightCard}
            >
              <View style={styles.insightHeader}>
                <View style={[styles.insightIconBox, { backgroundColor: insight.color + '22' }]}>
                  <Text style={styles.insightEmoji}>{insight.emoji}</Text>
                </View>
                <Text style={[styles.insightTitle, { color: insight.color }]}>
                  {insight.title}
                </Text>
              </View>
              <Text style={styles.insightValue}>{insight.value}</Text>
            </LinearGradient>
          ))}
        </View>

        {/* WEEKLY PATTERN */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📈 Weekly Pattern</Text>
          <View style={styles.weekCard}>
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, index) => {
              const heights = [60, 80, 45, 90, 70, 85, 55];
              const isToday = index === new Date().getDay();
              return (
                <View key={index} style={styles.weekBarContainer}>
                  <LinearGradient
                    colors={isToday ? ['#2d8eff', '#00c6ff'] : ['#1a3a5c', '#0d1f3c']}
                    style={[styles.weekBar, { height: heights[index] }]}
                  />
                  <Text style={[styles.weekDay, isToday && { color: colors.primary }]}>
                    {day}
                  </Text>
                </View>
              );
            })}
          </View>
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
    paddingBottom: 24,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
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
  aiBadge: {
    backgroundColor: colors.primary + '22',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.primary + '44',
  },
  aiBadgeText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
  heroStats: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
  },
  heroStatCard: {
    flex: 1,
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  heroStatEmoji: {
    fontSize: 24,
    marginBottom: 6,
  },
  heroStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  heroStatLabel: {
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 2,
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  loadingCard: {
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary + '33',
    gap: 12,
  },
  loadingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  loadingSubtitle: {
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
  },
  aiReadyCard: {
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: colors.success + '33',
  },
  aiReadyEmoji: {
    fontSize: 20,
  },
  aiReadyText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.success,
  },
  warningCard: {
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.warning + '33',
  },
  warningTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.warning,
    marginBottom: 8,
  },
  warningText: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 20,
  },
  insightCard: {
    borderRadius: 20,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  insightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  insightIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  insightEmoji: {
    fontSize: 18,
  },
  insightTitle: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  insightValue: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  weekCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 140,
  },
  weekBarContainer: {
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  weekBar: {
    width: 20,
    borderRadius: 6,
  },
  weekDay: {
    fontSize: 11,
    color: colors.textMuted,
  },
});