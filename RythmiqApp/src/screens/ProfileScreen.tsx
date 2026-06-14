import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../constants/colors';
import CircleProgress from '../components/CircleProgress';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <LinearGradient
          colors={[colors.gradientStart, colors.gradientEnd]}
          style={styles.avatar}
        >
          <Text style={styles.avatarText}>M</Text>
        </LinearGradient>
        <Text style={styles.name}>Muhammad</Text>
        <Text style={styles.subtitle}>Rythmiq Member ✨</Text>
      </View>

      {/* Stats Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>📊 Your Stats</Text>

        {/* Progress Rings Row */}
        <View style={styles.circlesRow}>
          <CircleProgress
            value={7}
            maxValue={24}
            color="#4d9fff"
            emoji="😴"
            label="Avg Sleep"
            unit="h"
          />
          <CircleProgress
            value={75}
            maxValue={100}
            color="#00e676"
            emoji="⚡"
            label="Avg Energy"
            unit="%"
          />
          <CircleProgress
            value={5}
            maxValue={30}
            color="#ffab00"
            emoji="🔥"
            label="Day Streak"
            unit="d"
          />
        </View>

        {/* Progress Bars */}
        <View style={styles.barsSection}>

          {/* Sleep Bar */}
          <View style={styles.barRow}>
            <Text style={styles.barLabel}>😴 Sleep Quality</Text>
            <Text style={styles.barPercent}>70%</Text>
          </View>
          <View style={styles.barTrack}>
            <LinearGradient
              colors={['#4d9fff', '#7c6fff']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.barFill, { width: '70%' }]}
            />
          </View>

          {/* Energy Bar */}
          <View style={styles.barRow}>
            <Text style={styles.barLabel}>⚡ Energy Level</Text>
            <Text style={styles.barPercent}>75%</Text>
          </View>
          <View style={styles.barTrack}>
            <LinearGradient
              colors={['#00e676', '#00d4ff']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.barFill, { width: '75%' }]}
            />
          </View>

          {/* Activity Bar */}
          <View style={styles.barRow}>
            <Text style={styles.barLabel}>🏃 Activity Score</Text>
            <Text style={styles.barPercent}>60%</Text>
          </View>
          <View style={styles.barTrack}>
            <LinearGradient
              colors={['#ffab00', '#ff6b9d']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.barFill, { width: '60%' }]}
            />
          </View>

        </View>
      </View>

      {/* Personal Info Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>👤 Personal Info</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>🌍 City</Text>
          <Text style={styles.infoValue}>Karachi</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>💪 Fitness Level</Text>
          <Text style={styles.infoValue}>Intermediate</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>🎯 Goal</Text>
          <Text style={styles.infoValue}>Stay Active</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>⚖️ Weight</Text>
          <Text style={styles.infoValue}>75 kg</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>📏 Height</Text>
          <Text style={styles.infoValue}>175 cm</Text>
        </View>
      </View>

      {/* Weather DNA Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🧬 Your Weather DNA</Text>
        <View style={styles.dnaRow}>
          <LinearGradient
            colors={[colors.gradientStart + '44', colors.gradientMid + '44']}
            style={styles.dnaChip}
          >
            <Text style={styles.dnaChipEmoji}>🌡️</Text>
            <Text style={styles.dnaChipTitle}>Best Temp</Text>
            <Text style={styles.dnaChipValue}>20-28°C</Text>
          </LinearGradient>
          <LinearGradient
            colors={[colors.gradientMid + '44', colors.gradientEnd + '44']}
            style={styles.dnaChip}
          >
            <Text style={styles.dnaChipEmoji}>⚡</Text>
            <Text style={styles.dnaChipTitle}>Peak Time</Text>
            <Text style={styles.dnaChipValue}>6-10 AM</Text>
          </LinearGradient>
          <LinearGradient
            colors={[colors.gradientEnd + '44', colors.gradientStart + '44']}
            style={styles.dnaChip}
          >
            <Text style={styles.dnaChipEmoji}>💧</Text>
            <Text style={styles.dnaChipTitle}>Humidity</Text>
            <Text style={styles.dnaChipValue}>Below 70%</Text>
          </LinearGradient>
        </View>
        <Text style={styles.dnaSub}>
          🔬 Based on 30 days of your activity patterns
        </Text>
      </View>

      <View style={{ height: 100 }} />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 4,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  circlesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  barsSection: {
    gap: 4,
  },
  barRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  barLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  barPercent: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '600',
  },
  barTrack: {
    height: 8,
    backgroundColor: colors.glassBorder,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  barFill: {
    height: '100%',
    borderRadius: 4,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.glassBorder,
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
  dnaRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  dnaChip: {
    flex: 1,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  dnaChipEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  dnaChipTitle: {
    fontSize: 10,
    color: colors.textMuted,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  dnaChipValue: {
    fontSize: 12,
    color: colors.textPrimary,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dnaSub: {
    fontSize: 11,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 4,
  },
});