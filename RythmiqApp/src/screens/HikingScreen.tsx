import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
  } from 'react-native';
  import { LinearGradient } from 'expo-linear-gradient';
  import { colors } from '../constants/colors';
  import { useWeather } from '../hooks/useWeather';
  
  const trails = [
    {
      name: 'Margalla Hills Trail 3',
      location: 'Islamabad',
      difficulty: 'Easy',
      distance: '4.2 km',
      duration: '1.5 hrs',
      elevation: '150m',
      emoji: '🌿',
      color: '#30d158',
    },
    {
      name: 'Mahodand Lake Trail',
      location: 'Swat',
      difficulty: 'Moderate',
      distance: '8.5 km',
      duration: '3 hrs',
      elevation: '400m',
      emoji: '🏔️',
      color: '#0a84ff',
    },
    {
      name: 'Nanga Parbat Base Camp',
      location: 'Gilgit',
      difficulty: 'Hard',
      distance: '15 km',
      duration: '6 hrs',
      elevation: '1200m',
      emoji: '⛰️',
      color: '#ff453a',
    },
    {
      name: 'Fairy Meadows Trail',
      location: 'Gilgit-Baltistan',
      difficulty: 'Moderate',
      distance: '10 km',
      duration: '4 hrs',
      elevation: '600m',
      emoji: '🌸',
      color: '#bf5af2',
    },
  ];
  
  const getDifficultyColor = (difficulty: string) => {
    if (difficulty === 'Easy') return '#30d158';
    if (difficulty === 'Moderate') return '#ffd60a';
    return '#ff453a';
  };
  
  const getHikingAdvice = (temp: number, humidity: number) => {
    if (temp > 38) return { safe: false, message: '🚫 Too hot for hiking today. Wait for cooler weather.' };
    if (temp > 32) return { safe: false, message: '⚠️ Very warm. Only early morning hikes recommended.' };
    if (humidity > 85) return { safe: false, message: '💧 High humidity. Uncomfortable for hiking.' };
    if (temp >= 15 && temp <= 28) return { safe: true, message: '✅ Perfect hiking conditions today!' };
    return { safe: true, message: '👍 Good conditions. Carry water and sunscreen.' };
  };
  
  export default function HikingScreen() {
    const { weather } = useWeather();
  
    const advice = weather
      ? getHikingAdvice(weather.temp, weather.humidity)
      : { safe: true, message: 'Loading conditions...' };
  
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
  
          {/* HERO */}
          <LinearGradient
            colors={['#0a1628', '#051020', '#000000']}
            style={styles.hero}
          >
            <View style={styles.topBar}>
              <View>
                <Text style={styles.appName}>HIKING</Text>
                <Text style={styles.topDate}>Trail Recommendations</Text>
              </View>
              <Text style={styles.heroEmoji}>🥾</Text>
            </View>
  
            {/* AI Hiking Advice Banner */}
            <LinearGradient
              colors={advice.safe
                ? ['rgba(48,209,88,0.2)', 'rgba(48,209,88,0.05)']
                : ['rgba(255,69,58,0.2)', 'rgba(255,69,58,0.05)']}
              style={styles.adviceBanner}
            >
              <Text style={styles.adviceText}>{advice.message}</Text>
            </LinearGradient>
  
            {/* Weather Conditions Row */}
            {weather && (
              <View style={styles.conditionsRow}>
                <View style={styles.conditionBox}>
                  <Text style={styles.conditionValue}>{weather.temp}°C</Text>
                  <Text style={styles.conditionLabel}>🌡️ Temp</Text>
                </View>
                <View style={styles.conditionDivider} />
                <View style={styles.conditionBox}>
                  <Text style={styles.conditionValue}>{weather.humidity}%</Text>
                  <Text style={styles.conditionLabel}>💧 Humidity</Text>
                </View>
                <View style={styles.conditionDivider} />
                <View style={styles.conditionBox}>
                  <Text style={styles.conditionValue}>{weather.windSpeed}m/s</Text>
                  <Text style={styles.conditionLabel}>💨 Wind</Text>
                </View>
                <View style={styles.conditionDivider} />
                <View style={styles.conditionBox}>
                  <Text style={styles.conditionValue}>
                    {advice.safe ? '✅' : '❌'}
                  </Text>
                  <Text style={styles.conditionLabel}>Safe</Text>
                </View>
              </View>
            )}
  
          </LinearGradient>
  
          {/* BEST TIME */}
          <View style={styles.section}>
            <LinearGradient
              colors={['#2d8eff22', '#00c6ff11']}
              style={styles.bestTimeCard}
            >
              <Text style={styles.bestTimeLabel}>⏰ BEST HIKING WINDOW</Text>
              <Text style={styles.bestTimeValue}>
                {weather && weather.temp > 30
                  ? '5:30 AM — 8:00 AM'
                  : '6:00 AM — 10:00 AM'}
              </Text>
              <Text style={styles.bestTimeSub}>
                Based on today's weather conditions
              </Text>
            </LinearGradient>
          </View>
  
          {/* ESSENTIALS */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🎒 Pack Essentials</Text>
            <View style={styles.essentialsGrid}>
              {[
                { emoji: '💧', item: '2L Water' },
                { emoji: '🧴', item: 'Sunscreen' },
                { emoji: '🥾', item: 'Boots' },
                { emoji: '🧭', item: 'Compass' },
                { emoji: '🍫', item: 'Snacks' },
                { emoji: '🩹', item: 'First Aid' },
              ].map((item, index) => (
                <View key={index} style={styles.essentialChip}>
                  <Text style={styles.essentialEmoji}>{item.emoji}</Text>
                  <Text style={styles.essentialText}>{item.item}</Text>
                </View>
              ))}
            </View>
          </View>
  
          {/* TRAILS */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🗺️ Recommended Trails</Text>
            {trails.map((trail, index) => (
              <TouchableOpacity key={index} activeOpacity={0.8}>
                <LinearGradient
                  colors={[trail.color + '22', trail.color + '11']}
                  style={styles.trailCard}
                >
                  {/* Trail Header */}
                  <View style={styles.trailHeader}>
                    <Text style={styles.trailEmoji}>{trail.emoji}</Text>
                    <View style={styles.trailInfo}>
                      <Text style={styles.trailName}>{trail.name}</Text>
                      <Text style={styles.trailLocation}>📍 {trail.location}</Text>
                    </View>
                    <View style={[styles.diffBadge, {
                      backgroundColor: getDifficultyColor(trail.difficulty) + '22',
                      borderColor: getDifficultyColor(trail.difficulty) + '44',
                    }]}>
                      <Text style={[styles.diffText, {
                        color: getDifficultyColor(trail.difficulty)
                      }]}>
                        {trail.difficulty}
                      </Text>
                    </View>
                  </View>
  
                  {/* Trail Stats */}
                  <View style={styles.trailStats}>
                    <View style={styles.trailStat}>
                      <Text style={styles.trailStatValue}>{trail.distance}</Text>
                      <Text style={styles.trailStatLabel}>Distance</Text>
                    </View>
                    <View style={styles.trailStatDivider} />
                    <View style={styles.trailStat}>
                      <Text style={styles.trailStatValue}>{trail.duration}</Text>
                      <Text style={styles.trailStatLabel}>Duration</Text>
                    </View>
                    <View style={styles.trailStatDivider} />
                    <View style={styles.trailStat}>
                      <Text style={styles.trailStatValue}>{trail.elevation}</Text>
                      <Text style={styles.trailStatLabel}>Elevation</Text>
                    </View>
                  </View>
  
                  {/* AI Rating */}
                  <View style={styles.aiRating}>
                    <Text style={styles.aiRatingText}>
                      🧠 AI Rating: {advice.safe ? '⭐⭐⭐⭐⭐ Great day for this trail!' : '⚠️ Not recommended today'}
                    </Text>
                  </View>
  
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
  
          {/* SAFETY TIPS */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>⚠️ Safety Tips</Text>
            <View style={styles.safetyCard}>
              {[
                'Always tell someone your hiking plan',
                'Check weather before you go',
                'Start early to avoid afternoon heat',
                'Never hike alone in remote areas',
                'Carry emergency contacts',
              ].map((tip, index) => (
                <View key={index} style={styles.safetyRow}>
                  <Text style={styles.safetyDot}>•</Text>
                  <Text style={styles.safetyText}>{tip}</Text>
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
    heroEmoji: {
      fontSize: 40,
    },
    adviceBanner: {
      marginHorizontal: 20,
      borderRadius: 16,
      padding: 14,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: colors.glassBorder,
    },
    adviceText: {
      fontSize: 14,
      color: colors.textPrimary,
      fontWeight: '600',
      textAlign: 'center',
    },
    conditionsRow: {
      flexDirection: 'row',
      marginHorizontal: 20,
      backgroundColor: colors.card,
      borderRadius: 16,
      padding: 14,
      borderWidth: 1,
      borderColor: colors.glassBorder,
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    conditionBox: {
      alignItems: 'center',
    },
    conditionValue: {
      fontSize: 15,
      fontWeight: 'bold',
      color: colors.textPrimary,
    },
    conditionLabel: {
      fontSize: 10,
      color: colors.textMuted,
      marginTop: 2,
    },
    conditionDivider: {
      width: 1,
      height: 30,
      backgroundColor: colors.glassBorder,
    },
    section: {
      paddingHorizontal: 20,
      marginTop: 16,
    },
    bestTimeCard: {
      borderRadius: 20,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.primary + '33',
    },
    bestTimeLabel: {
      fontSize: 10,
      color: colors.textMuted,
      letterSpacing: 2,
      marginBottom: 6,
    },
    bestTimeValue: {
      fontSize: 22,
      fontWeight: 'bold',
      color: colors.primary,
      marginBottom: 4,
    },
    bestTimeSub: {
      fontSize: 12,
      color: colors.textMuted,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.textPrimary,
      marginBottom: 12,
    },
    essentialsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },
    essentialChip: {
      backgroundColor: colors.card,
      borderRadius: 14,
      paddingHorizontal: 14,
      paddingVertical: 10,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      borderWidth: 1,
      borderColor: colors.glassBorder,
    },
    essentialEmoji: {
      fontSize: 16,
    },
    essentialText: {
      fontSize: 13,
      color: colors.textPrimary,
      fontWeight: '500',
    },
    trailCard: {
      borderRadius: 20,
      padding: 16,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: colors.glassBorder,
    },
    trailHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      marginBottom: 14,
    },
    trailEmoji: {
      fontSize: 36,
    },
    trailInfo: {
      flex: 1,
    },
    trailName: {
      fontSize: 15,
      fontWeight: 'bold',
      color: colors.textPrimary,
      marginBottom: 2,
    },
    trailLocation: {
      fontSize: 12,
      color: colors.textMuted,
    },
    diffBadge: {
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 4,
      borderWidth: 1,
    },
    diffText: {
      fontSize: 11,
      fontWeight: '700',
    },
    trailStats: {
      flexDirection: 'row',
      backgroundColor: 'rgba(255,255,255,0.05)',
      borderRadius: 12,
      padding: 12,
      justifyContent: 'space-around',
      marginBottom: 12,
    },
    trailStat: {
      alignItems: 'center',
    },
    trailStatValue: {
      fontSize: 14,
      fontWeight: 'bold',
      color: colors.textPrimary,
    },
    trailStatLabel: {
      fontSize: 10,
      color: colors.textMuted,
      marginTop: 2,
    },
    trailStatDivider: {
      width: 1,
      backgroundColor: colors.glassBorder,
    },
    aiRating: {
      backgroundColor: 'rgba(255,255,255,0.05)',
      borderRadius: 10,
      padding: 8,
    },
    aiRatingText: {
      fontSize: 12,
      color: colors.textSecondary,
    },
    safetyCard: {
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.glassBorder,
    },
    safetyRow: {
      flexDirection: 'row',
      gap: 8,
      marginBottom: 10,
    },
    safetyDot: {
      color: colors.warning,
      fontSize: 16,
    },
    safetyText: {
      fontSize: 13,
      color: colors.textSecondary,
      flex: 1,
      lineHeight: 20,
    },
  });