import { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import OnboardingScreen from './src/screens/OnboardingScreen';
import LandingScreen from './src/screens/LandingScreen';

const { width } = Dimensions.get('window');
const isMobile = width <= 480;

export default function App() {
  const [screen, setScreen] = useState<'landing' | 'onboarding' | 'app'>('landing');

  // WEB — always full width, no phone frame
  if (!isMobile) {
    return (
      <View style={styles.webWrapper}>
        {screen === 'landing' && (
          <LandingScreen onGetStarted={() => setScreen('onboarding')} />
        )}
        {screen === 'onboarding' && (
          <OnboardingScreen onDone={() => setScreen('app')} />
        )}
        {screen === 'app' && (
          <AppNavigator />
        )}
      </View>
    );
  }

  // MOBILE — phone frame
  return (
    <View style={styles.wrapper}>
      <View style={styles.phoneContainer}>
        {screen === 'landing' && (
          <LandingScreen onGetStarted={() => setScreen('onboarding')} />
        )}
        {screen === 'onboarding' && (
          <OnboardingScreen onDone={() => setScreen('app')} />
        )}
        {screen === 'app' && (
          <AppNavigator />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  webWrapper: {
    flex: 1,
    backgroundColor: '#050d1a',
  },
  wrapper: {
    flex: 1,
    backgroundColor: '#050d1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
  },
});