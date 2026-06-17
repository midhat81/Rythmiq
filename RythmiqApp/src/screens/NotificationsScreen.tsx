import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
  } from 'react-native';
  import { LinearGradient } from 'expo-linear-gradient';
  import { useState } from 'react';
  import { colors } from '../constants/colors';
  
  const notifications = [
    {
      id: 1,
      type: 'weather',
      emoji: '⛅',
      title: 'Weather Update',
      message: 'Clear skies today! Perfect for your morning walk.',
      time: '6:00 AM',
      color: '#0a84ff',
      read: false,
    },
    {
      id: 2,
      type: 'energy',
      emoji: '🔋',
      title: 'Energy Alert',
      message: 'Your energy is at 75%. Great time for outdoor activity!',
      time: '8:30 AM',
      color: '#30d158',
      read: false,
    },
    {
      id: 3,
      type: 'hiking',
      emoji: '🥾',
      title: 'Hiking Window',
      message: 'Perfect hiking conditions until 10 AM. Go now!',
      time: '7:00 AM',
      color: '#bf5af2',
      read: false,
    },
    {
      id: 4,
      type: 'ai',
      emoji: '🧠',
      title: 'AI Insight',
      message: 'Based on your pattern, you perform best on clear mornings.',
      time: '9:00 AM',
      color: '#ffd60a',
      read: true,
    },
    {
      id: 5,
      type: 'sleep',
      emoji: '😴',
      title: 'Sleep Reminder',
      message: 'You slept 7 hours last night. Energy level is optimal!',
      time: 'Yesterday',
      color: '#5ac8fa',
      read: true,
    },
    {
      id: 6,
      type: 'weather',
      emoji: '🌧️',
      title: 'Rain Alert',
      message: 'Rain expected at 5 PM. Plan your outdoor activities before 4 PM.',
      time: 'Yesterday',
      color: '#0a84ff',
      read: true,
    },
    {
      id: 7,
      type: 'streak',
      emoji: '🔥',
      title: 'Streak Alert',
      message: 'Amazing! You\'ve maintained a 7 day activity streak!',
      time: '2 days ago',
      color: '#ff9500',
      read: true,
    },
  ];
  
  export default function NotificationsScreen() {
    const [notifs, setNotifs] = useState(notifications);
  
    const unreadCount = notifs.filter(n => !n.read).length;
  
    const markAllRead = () => {
      setNotifs(notifs.map(n => ({ ...n, read: true })));
    };
  
    const markRead = (id: number) => {
      setNotifs(notifs.map(n => n.id === id ? { ...n, read: true } : n));
    };
  
    const unread = notifs.filter(n => !n.read);
    const read = notifs.filter(n => n.read);
  
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
                <Text style={styles.appName}>NOTIFICATIONS</Text>
                <Text style={styles.topDate}>
                  {unreadCount} unread alerts
                </Text>
              </View>
              {unreadCount > 0 && (
                <TouchableOpacity
                  style={styles.markAllBtn}
                  onPress={markAllRead}
                >
                  <Text style={styles.markAllText}>Mark all read</Text>
                </TouchableOpacity>
              )}
            </View>
  
            {/* Stats Row */}
            <View style={styles.statsRow}>
              <LinearGradient
                colors={['#0a84ff22', '#0a84ff11']}
                style={styles.statCard}
              >
                <Text style={styles.statValue}>{unreadCount}</Text>
                <Text style={styles.statLabel}>🔔 Unread</Text>
              </LinearGradient>
              <LinearGradient
                colors={['#30d15822', '#30d15811']}
                style={styles.statCard}
              >
                <Text style={styles.statValue}>{notifs.length}</Text>
                <Text style={styles.statLabel}>📬 Total</Text>
              </LinearGradient>
              <LinearGradient
                colors={['#bf5af222', '#bf5af211']}
                style={styles.statCard}
              >
                <Text style={styles.statValue}>3</Text>
                <Text style={styles.statLabel}>🧠 AI Alerts</Text>
              </LinearGradient>
            </View>
  
          </LinearGradient>
  
          {/* UNREAD */}
          {unread.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🔔 New</Text>
              {unread.map((notif) => (
                <TouchableOpacity
                  key={notif.id}
                  onPress={() => markRead(notif.id)}
                  activeOpacity={0.8}
                >
                  <LinearGradient
                    colors={[notif.color + '22', notif.color + '11']}
                    style={styles.notifCard}
                  >
                    <View style={[styles.notifIcon, {
                      backgroundColor: notif.color + '22'
                    }]}>
                      <Text style={styles.notifEmoji}>{notif.emoji}</Text>
                    </View>
                    <View style={styles.notifContent}>
                      <View style={styles.notifHeader}>
                        <Text style={[styles.notifTitle, { color: notif.color }]}>
                          {notif.title}
                        </Text>
                        <Text style={styles.notifTime}>{notif.time}</Text>
                      </View>
                      <Text style={styles.notifMessage}>{notif.message}</Text>
                    </View>
                    <View style={[styles.unreadDot, {
                      backgroundColor: notif.color
                    }]} />
                  </LinearGradient>
                </TouchableOpacity>
              ))}
            </View>
          )}
  
          {/* READ */}
          {read.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>📭 Earlier</Text>
              {read.map((notif) => (
                <View key={notif.id} style={styles.notifCardRead}>
                  <View style={[styles.notifIcon, {
                    backgroundColor: colors.glassBorder
                  }]}>
                    <Text style={styles.notifEmoji}>{notif.emoji}</Text>
                  </View>
                  <View style={styles.notifContent}>
                    <View style={styles.notifHeader}>
                      <Text style={styles.notifTitleRead}>{notif.title}</Text>
                      <Text style={styles.notifTime}>{notif.time}</Text>
                    </View>
                    <Text style={styles.notifMessageRead}>{notif.message}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}
  
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
    markAllBtn: {
      backgroundColor: colors.primary + '22',
      borderRadius: 20,
      paddingHorizontal: 14,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: colors.primary + '44',
    },
    markAllText: {
      color: colors.primary,
      fontSize: 12,
      fontWeight: '600',
    },
    statsRow: {
      flexDirection: 'row',
      paddingHorizontal: 20,
      gap: 10,
    },
    statCard: {
      flex: 1,
      borderRadius: 16,
      padding: 14,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.glassBorder,
    },
    statValue: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.textPrimary,
    },
    statLabel: {
      fontSize: 11,
      color: colors.textMuted,
      marginTop: 4,
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
    notifCard: {
      borderRadius: 20,
      padding: 14,
      marginBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      borderWidth: 1,
      borderColor: colors.glassBorder,
    },
    notifCardRead: {
      backgroundColor: colors.card,
      borderRadius: 20,
      padding: 14,
      marginBottom: 10,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
      borderWidth: 1,
      borderColor: colors.glassBorder,
      opacity: 0.6,
    },
    notifIcon: {
      width: 44,
      height: 44,
      borderRadius: 22,
      alignItems: 'center',
      justifyContent: 'center',
    },
    notifEmoji: {
      fontSize: 22,
    },
    notifContent: {
      flex: 1,
    },
    notifHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    notifTitle: {
      fontSize: 13,
      fontWeight: '700',
    },
    notifTitleRead: {
      fontSize: 13,
      fontWeight: '700',
      color: colors.textSecondary,
    },
    notifTime: {
      fontSize: 11,
      color: colors.textMuted,
    },
    notifMessage: {
      fontSize: 12,
      color: colors.textSecondary,
      lineHeight: 18,
    },
    notifMessageRead: {
      fontSize: 12,
      color: colors.textMuted,
      lineHeight: 18,
    },
    unreadDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
    },
  });