import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { colors } from '../constants/colors';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    id: 1,
    emoji: '🎯',
    title: 'Meet Rythmiq',
    subtitle: 'Your Personal AI Life Assistant',
    description: 'Rythmiq learns your unique rhythm and proactively guides your day — no typing needed.',
    color: colors.primary,
  },
  {
    id: 2,
    emoji: '⛅',
    title: 'Weather Smart',
    subtitle: 'AI + Weather = Perfect Day',
    description: 'Real-time weather analysis tells you exactly when to go out, hike, or stay in.',
    color: colors.cyan,
  },
  {
    id: 3,
    emoji: '🔋',
    title: 'Energy Aware',
    subtitle: 'Know Your Body Better',
    description: 'Track sleep and energy. AI builds your personal Weather DNA over time.',
    color: colors.purple,
  },
  {
    id: 4,
    emoji: '🧬',
    title: 'Your Rhythm',
    subtitle: 'Personalized Just For You',
    description: 'After 30 days Rythmiq knows your perfect temperature, peak hours, and best activities.',
    color: colors.success,
  },
];

interface Props {
  onDone: () => void;
}

export default function OnboardingScreen({ onDone }: Props) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onDone();
    }
  };

  const handleSkip = () => {
    onDone();
  };

  const slide = slides[currentSlide];

  return (
    <LinearGradient
      colors={['#000000', '#0a0a1a', '#000000']}
      style={styles.container}
    >

      {/* Skip Button */}
      {currentSlide < slides.length - 1 && (
        <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}

      {/* Slide Content */}
      <View style={styles.content}>

        {/* Emoji Circle */}
        <LinearGradient
          colors={[slide.color + '33', slide.color + '11']}
          style={[styles.emojiCircle, { borderColor: slide.color + '44' }]}
        >
          <Text style={styles.emoji}>{slide.emoji}</Text>
        </LinearGradient>

        {/* Text */}
        <Text style={[styles.title, { color: slide.color }]}>{slide.title}</Text>
        <Text style={styles.subtitle}>{slide.subtitle}</Text>
        <Text style={styles.description}>{slide.description}</Text>

      </View>

      {/* Bottom Section */}
      <View style={styles.bottom}>

        {/* Dots */}
        <View style={styles.dots}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  backgroundColor: index === currentSlide ? slide.color : colors.glassBorder,
                  width: index === currentSlide ? 24 : 8,
                }
              ]}
            />
          ))}
        </View>

        {/* Next Button */}
        <TouchableOpacity onPress={handleNext}>
          <LinearGradient
            colors={[slide.color, slide.color + 'aa']}
            style={styles.nextBtn}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.nextText}>
              {currentSlide === slides.length - 1 ? '🚀 Get Started' : 'Next →'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

      </View>

    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  skipBtn: {
    position: 'absolute',
    top: 50,
    right: 24,
    zIndex: 10,
  },
  skipText: {
    color: colors.textMuted,
    fontSize: 16,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emojiCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    borderWidth: 1,
  },
  emoji: {
    fontSize: 64,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '600',
  },
  description: {
    fontSize: 15,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 24,
  },
  bottom: {
    paddingHorizontal: 32,
    paddingBottom: 50,
    alignItems: 'center',
    gap: 24,
  },
  dots: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 4,
  },
  nextBtn: {
    paddingHorizontal: 48,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    width: width - 64,
  },
  nextText: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: 'bold',
  },
});