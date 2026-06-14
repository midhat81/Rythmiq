import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
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

  return (
    <ScrollView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>🧠 AI Insights</Text>
        <Text style={styles.subtitle}>Personalized just for you</Text>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator color={colors.primary} size="large" />
          <Text style={styles.loadingText}>AI is analyzing your data...</Text>
        </View>
      ) : advice ? (
        <View>

          {/* Morning Advice */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>🌅 Morning Advice</Text>
            <Text style={styles.cardText}>{advice.morningAdvice}</Text>
          </View>

          {/* Energy Tip */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>⚡ Energy Tip</Text>
            <Text style={styles.cardText}>{advice.energyTip}</Text>
          </View>

          {/* Activity Plan */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>🎯 Activity Plan</Text>
            <Text style={styles.cardText}>{advice.activityPlan}</Text>
          </View>

          {/* Weather Warning */}
          {advice.weatherWarning !== '' && (
            <View style={[styles.card, styles.warningCard]}>
              <Text style={styles.cardTitle}>⚠️ Weather Warning</Text>
              <Text style={styles.warningText}>{advice.weatherWarning}</Text>
            </View>
          )}

          {/* Motivational Message */}
          <View style={[styles.card, styles.motivationCard]}>
            <Text style={styles.cardTitle}>💪 Daily Motivation</Text>
            <Text style={styles.motivationText}>
              {advice.motivationalMessage}
            </Text>
          </View>

        </View>
      ) : (
        <View style={styles.card}>
          <Text style={styles.cardText}>Loading your personalized insights...</Text>
        </View>
      )}

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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 5,
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  loadingText: {
    color: colors.textSecondary,
    marginTop: 16,
    fontSize: 16,
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
  motivationCard: {
    borderColor: colors.primary,
  },
  cardTitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    color: colors.textPrimary,
    lineHeight: 24,
  },
  warningText: {
    fontSize: 16,
    color: colors.warning,
    lineHeight: 24,
  },
  motivationText: {
    fontSize: 18,
    color: colors.primary,
    lineHeight: 26,
    fontWeight: '600',
  },
});