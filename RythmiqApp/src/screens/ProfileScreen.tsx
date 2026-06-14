import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { colors } from '../constants/colors';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>M</Text>
        </View>
        <Text style={styles.name}>Muhammad</Text>
        <Text style={styles.subtitle}>Rythmiq Member</Text>
      </View>

      {/* Stats Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📊 Your Stats</Text>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>7</Text>
            <Text style={styles.statLabel}>Avg Sleep</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>75%</Text>
            <Text style={styles.statLabel}>Avg Energy</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>
      </View>

      {/* Personal Info Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>👤 Personal Info</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>City</Text>
          <Text style={styles.infoValue}>Karachi</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Fitness Level</Text>
          <Text style={styles.infoValue}>Intermediate</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Goal</Text>
          <Text style={styles.infoValue}>Stay Active</Text>
        </View>
      </View>

      {/* Weather DNA Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🧬 Your Weather DNA</Text>
        <Text style={styles.dnaText}>
          Best Temperature: 20°C - 28°C
        </Text>
        <Text style={styles.dnaText}>
          Peak Energy Time: 6 AM - 10 AM
        </Text>
        <Text style={styles.dnaText}>
          Optimal Humidity: Below 70%
        </Text>
        <Text style={styles.dnaSub}>
          Based on your activity patterns
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
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 30,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
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
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  infoValue: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  dnaText: {
    fontSize: 14,
    color: colors.textPrimary,
    marginBottom: 8,
  },
  dnaSub: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 8,
  },
});