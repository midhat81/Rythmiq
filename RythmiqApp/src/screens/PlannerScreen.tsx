import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { colors } from '../constants/colors';

const morningPlan = [
  { time: '6:00 AM', task: '🌅 Wake up + stretch', done: false },
  { time: '6:30 AM', task: '🚶 Morning walk', done: false },
  { time: '7:30 AM', task: '🍳 Healthy breakfast', done: false },
  { time: '8:30 AM', task: '📚 Reading or learning', done: false },
  { time: '10:00 AM', task: '💻 Focus work time', done: false },
];

const eveningPlan = [
  { time: '5:00 PM', task: '🧘 Evening yoga', done: false },
  { time: '6:00 PM', task: '🌿 Outdoor walk', done: false },
  { time: '7:00 PM', task: '🍽️ Light dinner', done: false },
  { time: '9:00 PM', task: '📖 Wind down reading', done: false },
  { time: '10:00 PM', task: '😴 Sleep time', done: false },
];

export default function PlannerScreen() {
  return (
    <ScrollView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>📅 Daily Planner</Text>
        <Text style={styles.subtitle}>Your AI planned day</Text>
      </View>

      {/* Morning Plan */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🌅 Morning Plan</Text>
        {morningPlan.map((item, index) => (
          <View key={index} style={styles.planItem}>
            <Text style={styles.planTime}>{item.time}</Text>
            <Text style={styles.planTask}>{item.task}</Text>
          </View>
        ))}
      </View>

      {/* Evening Plan */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>🌙 Evening Plan</Text>
        {eveningPlan.map((item, index) => (
          <View key={index} style={styles.planItem}>
            <Text style={styles.planTime}>{item.time}</Text>
            <Text style={styles.planTask}>{item.task}</Text>
          </View>
        ))}
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
  planItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  planTime: {
    fontSize: 13,
    color: colors.primary,
    width: 80,
  },
  planTask: {
    fontSize: 15,
    color: colors.textPrimary,
    flex: 1,
  },
});