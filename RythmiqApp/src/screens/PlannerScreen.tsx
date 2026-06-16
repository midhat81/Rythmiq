import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { colors } from '../constants/colors';

const { width } = Dimensions.get('window');

const morningPlan = [
  { time: '6:00 AM', task: 'Wake up + stretch', emoji: '🌅', done: false, color: '#ffd60a' },
  { time: '6:30 AM', task: 'Morning walk', emoji: '🚶', done: false, color: '#30d158' },
  { time: '7:30 AM', task: 'Healthy breakfast', emoji: '🍳', done: false, color: '#ff9500' },
  { time: '8:30 AM', task: 'Reading or learning', emoji: '📚', done: false, color: '#0a84ff' },
  { time: '10:00 AM', task: 'Focus work time', emoji: '💻', done: false, color: '#bf5af2' },
];

const eveningPlan = [
  { time: '5:00 PM', task: 'Evening yoga', emoji: '🧘', done: false, color: '#bf5af2' },
  { time: '6:00 PM', task: 'Outdoor walk', emoji: '🌿', done: false, color: '#30d158' },
  { time: '7:00 PM', task: 'Light dinner', emoji: '🍽️', done: false, color: '#ff9500' },
  { time: '9:00 PM', task: 'Wind down reading', emoji: '📖', done: false, color: '#0a84ff' },
  { time: '10:00 PM', task: 'Sleep time', emoji: '😴', done: false, color: '#5ac8fa' },
];

export default function PlannerScreen() {
  const [morningTasks, setMorningTasks] = useState(morningPlan);
  const [eveningTasks, setEveningTasks] = useState(eveningPlan);
  const [activeTab, setActiveTab] = useState<'morning' | 'evening'>('morning');

  const toggleTask = (index: number, type: 'morning' | 'evening') => {
    if (type === 'morning') {
      const updated = [...morningTasks];
      updated[index].done = !updated[index].done;
      setMorningTasks(updated);
    } else {
      const updated = [...eveningTasks];
      updated[index].done = !updated[index].done;
      setEveningTasks(updated);
    }
  };

  const completedMorning = morningTasks.filter(t => t.done).length;
  const completedEvening = eveningTasks.filter(t => t.done).length;
  const totalCompleted = completedMorning + completedEvening;
  const totalTasks = morningTasks.length + eveningTasks.length;
  const progressPercent = Math.round((totalCompleted / totalTasks) * 100);

  const tasks = activeTab === 'morning' ? morningTasks : eveningTasks;

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
              <Text style={styles.appName}>PLANNER</Text>
              <Text style={styles.topDate}>
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
            </View>
            <View style={styles.progressCircle}>
              <Text style={styles.progressValue}>{progressPercent}%</Text>
              <Text style={styles.progressLabel}>Done</Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.heroProgress}>
            <View style={styles.heroProgressBar}>
              <LinearGradient
                colors={['#2d8eff', '#00c6ff']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.heroProgressFill, { width: `${progressPercent}%` as any }]}
              />
            </View>
            <Text style={styles.heroProgressText}>
              {totalCompleted}/{totalTasks} tasks completed
            </Text>
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <LinearGradient
              colors={['#ffd60a22', '#ffd60a11']}
              style={styles.statCard}
            >
              <Text style={styles.statEmoji}>🌅</Text>
              <Text style={styles.statValue}>{completedMorning}/{morningTasks.length}</Text>
              <Text style={styles.statLabel}>Morning</Text>
            </LinearGradient>
            <LinearGradient
              colors={['#5ac8fa22', '#5ac8fa11']}
              style={styles.statCard}
            >
              <Text style={styles.statEmoji}>🌙</Text>
              <Text style={styles.statValue}>{completedEvening}/{eveningTasks.length}</Text>
              <Text style={styles.statLabel}>Evening</Text>
            </LinearGradient>
            <LinearGradient
              colors={['#30d15822', '#30d15811']}
              style={styles.statCard}
            >
              <Text style={styles.statEmoji}>🔥</Text>
              <Text style={styles.statValue}>{totalCompleted}</Text>
              <Text style={styles.statLabel}>Done</Text>
            </LinearGradient>
          </View>

        </LinearGradient>

        {/* TAB SELECTOR */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'morning' && styles.tabActive]}
            onPress={() => setActiveTab('morning')}
          >
            <LinearGradient
              colors={activeTab === 'morning' ? ['#2d8eff', '#00c6ff'] : ['transparent', 'transparent']}
              style={styles.tabGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={[styles.tabText, activeTab === 'morning' && styles.tabTextActive]}>
                🌅 Morning
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'evening' && styles.tabActive]}
            onPress={() => setActiveTab('evening')}
          >
            <LinearGradient
              colors={activeTab === 'evening' ? ['#2d8eff', '#00c6ff'] : ['transparent', 'transparent']}
              style={styles.tabGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={[styles.tabText, activeTab === 'evening' && styles.tabTextActive]}>
                🌙 Evening
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* TASKS LIST */}
        <View style={styles.tasksList}>
          {tasks.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => toggleTask(index, activeTab)}
              activeOpacity={0.8}
            >
              <View style={[styles.taskCard, item.done && styles.taskCardDone]}>

                {/* Left Timeline */}
                <View style={styles.timeline}>
                  <View style={[styles.timelineDot, { backgroundColor: item.done ? colors.success : item.color }]} />
                  {index < tasks.length - 1 && <View style={styles.timelineLine} />}
                </View>

                {/* Task Content */}
                <View style={styles.taskContent}>
                  <Text style={styles.taskTime}>{item.time}</Text>
                  <View style={styles.taskRow}>
                    <Text style={styles.taskEmoji}>{item.emoji}</Text>
                    <Text style={[styles.taskName, item.done && styles.taskNameDone]}>
                      {item.task}
                    </Text>
                    <View style={[styles.checkBox, item.done && { backgroundColor: colors.success, borderColor: colors.success }]}>
                      {item.done && <Text style={styles.checkMark}>✓</Text>}
                    </View>
                  </View>
                </View>

              </View>
            </TouchableOpacity>
          ))}
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
  progressCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
  },
  progressLabel: {
    fontSize: 9,
    color: colors.textMuted,
  },
  heroProgress: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  heroProgressBar: {
    height: 6,
    backgroundColor: colors.glassBorder,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  heroProgressFill: {
    height: '100%',
    borderRadius: 3,
  },
  heroProgressText: {
    fontSize: 12,
    color: colors.textMuted,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 10,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  statEmoji: {
    fontSize: 20,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 2,
  },
  tabContainer: {
    flexDirection: 'row',
    margin: 20,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  tab: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  tabActive: {},
  tabGradient: {
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 12,
  },
  tabText: {
    fontSize: 14,
    color: colors.textMuted,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#ffffff',
  },
  tasksList: {
    paddingHorizontal: 20,
  },
  taskCard: {
    flexDirection: 'row',
    marginBottom: 4,
    opacity: 1,
  },
  taskCardDone: {
    opacity: 0.5,
  },
  timeline: {
    width: 30,
    alignItems: 'center',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 18,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: colors.glassBorder,
    marginTop: 4,
    marginBottom: 4,
  },
  taskContent: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 14,
    marginLeft: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  taskTime: {
    fontSize: 11,
    color: colors.textMuted,
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  taskEmoji: {
    fontSize: 20,
  },
  taskName: {
    flex: 1,
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  taskNameDone: {
    textDecorationLine: 'line-through',
    color: colors.textMuted,
  },
  checkBox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.glassBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkMark: {
    color: '#000000',
    fontSize: 12,
    fontWeight: 'bold',
  },
});