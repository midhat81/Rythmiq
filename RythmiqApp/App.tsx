import { useState } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import OnboardingScreen from './src/screens/OnboardingScreen';

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  if (showOnboarding) {
    return <OnboardingScreen onDone={() => setShowOnboarding(false)} />;
  }

  return <AppNavigator />;
}