import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../constants/colors';
import CircleProgress from '../components/CircleProgress';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* HERO HEADER */}
        <LinearGradient
          colors={['#0a1628', '#051020', '#000000']}
          style={styles.hero}
        >
          <View style={styles.topBar}>
            <Text style={styles.appName}>PROFILE</Text>
            <TouchableOpacity style={styles.editBtn}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>

          {/* Avatar Section */}
          <View style={styles.avatarSection}>
            <LinearGradient
              colors={['#2d8eff', '#00c6ff']}
              style={styles.avatar}
            >
              <Text style={styles.avatarText}>M</Text>
            </LinearGradient>
            <Text style={styles.name}>Muhammad Midhat</Text>
            <Text style={styles.subtitle}>Rythmiq Member ✨</Text>
            <View style={styles.memberBadge}>
              <Text style={styles.memberBadgeText}>🏆 7 Day Streak</Text>
            </View>
          </View>

        </LinearGradient>

        {/* STATS RINGS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Your Stats</Text>
          <View style={styles.ringsCard}>
            <View style={styles.ringsRow}>
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
                value={7}
                maxValue={30}
                color="#ffab00"
                emoji="🔥"
                label="Day Streak"
                unit="d"
              />
            </View>

            {/* Progress Bars */}
            <View style={styles.barsSection}>

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
        </View>

        {/* PERSONAL INFO */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👤 Personal Info</Text>
          <View style={styles.infoCard}>
            {[
              { label: '🌍 City', value: 'Karachi' },
              { label: '💪 Fitness', value: 'Intermediate' },
              { label: '🎯 Goal', value: 'Stay Active' },
              { label: '⚖️ Weight', value: '75 kg' },
              { label: '📏 Height', value: '175 cm' },
              { label: '🎂 Age', value: '25 years' },
            ].map((item, index) => (
              <View
                key={index}
                style={[
                  styles.infoRow,
                  index === 5 && { borderBottomWidth: 0 }
                ]}
              >
                <Text style={styles.infoLabel}>{item.label}</Text>
                <Text style={styles.infoValue}>{item.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* WEATHER DNA */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🧬 Weather DNA</Text>
          <View style={styles.dnaCard}>
            <Text style={styles.dnaSubtitle}>
              Your unique personal pattern discovered by AI
            </Text>
            <View style={styles.dnaGrid}>
              {[
                { emoji: '🌡️', title: 'Best Temp', value: '20-28°C', color: '#ff9500' },
                { emoji: '⚡', title: 'Peak Time', value: '6-10 AM', color: '#ffd60a' },
                { emoji: '💧', title: 'Humidity', value: 'Below 70%', color: '#0a84ff' },
                { emoji: '💨', title: 'Wind', value: 'Below 10 m/s', color: '#30d158' },
              ].map((item, index) => (
                <LinearGradient
                  key={index}
                  colors={[item.color + '22', item.color + '11']}
                  style={styles.dnaChip}
                >
                  <Text style={styles.dnaChipEmoji}>{item.emoji}</Text>
                  <Text style={styles.dnaChipTitle}>{item.title}</Text>
                  <Text style={[styles.dnaChipValue, { color: item.color }]}>
                    {item.value}
                  </Text>
                </LinearGradient>
              ))}
            </View>
            <Text style={styles.dnaSub}>
              🔬 Based on 30 days of your activity patterns
            </Text>
          </View>
        </View>

        {/* ACHIEVEMENTS */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🏆 Achievements</Text>
          <View style={styles.achievementsCard}>
            {[
              { emoji: '🌅', title: 'Early Bird', desc: '7 morning walks completed', unlocked: true },
              { emoji: '🔥', title: 'On Fire', desc: '7 day streak achieved', unlocked: true },
              { emoji: '🧘', title: 'Zen Master', desc: '10 yoga sessions done', unlocked: false },
              { emoji: '🥾', title: 'Hiker', desc: 'Complete first hike', unlocked: false },
            ].map((item, index) => (
              <View key={index} style={[
                styles.achievementRow,
                index === 3 && { borderBottomWidth: 0 }
              ]}>
                <View style={[
                  styles.achievementIcon,
                  { opacity: item.unlocked ? 1 : 0.3 }
                ]}>
                  <Text style={styles.achievementEmoji}>{item.emoji}</Text>
                </View>
                <View style={styles.achievementText}>
                  <Text style={[
                    styles.achievementTitle,
                    { opacity: item.unlocked ? 1 : 0.4 }
                  ]}>
                    {item.title}
                  </Text>
                  <Text style={styles.achievementDesc}>{item.desc}</Text>
                </View>
                {item.unlocked && (
                  <Text style={styles.achievementBadge}>✅</Text>
                )}
              </View>
            ))}
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
    paddingBottom: 30,
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
  editBtn: {
    backgroundColor: colors.primary + '22',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.primary + '44',
  },
  editText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '600',
  },
  avatarSection: {
    alignItems: 'center',
    paddingBottom: 10,
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
    color: '#ffffff',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 4,
    marginBottom: 12,
  },
  memberBadge: {
    backgroundColor: colors.warning + '22',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: colors.warning + '44',
  },
  memberBadgeText: {
    color: colors.warning,
    fontSize: 13,
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  ringsCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  ringsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
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
  infoCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    overflow: 'hidden',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
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
  dnaCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  dnaSubtitle: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 16,
    textAlign: 'center',
  },
  dnaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 12,
  },
  dnaChip: {
    width: '47%',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  dnaChipEmoji: {
    fontSize: 28,
    marginBottom: 6,
  },
  dnaChipTitle: {
    fontSize: 10,
    color: colors.textMuted,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  dnaChipValue: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dnaSub: {
    fontSize: 11,
    color: colors.textMuted,
    textAlign: 'center',
  },
  achievementsCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    overflow: 'hidden',
  },
  achievementRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.glassBorder,
    gap: 12,
  },
  achievementIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.glassBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementEmoji: {
    fontSize: 22,
  },
  achievementText: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  achievementDesc: {
    fontSize: 12,
    color: colors.textMuted,
  },
  achievementBadge: {
    fontSize: 18,
  },
});