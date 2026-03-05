import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  useAnimatedReaction,
  interpolateColor,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';

export default function UnlockButton() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const scale = useSharedValue(1);

  // 1. The Reaction: Watching the "Sweet Spot"
  useAnimatedReaction(
    () => scale.value,
    (current, previous) => {
      // Logic: If we just crossed 1.5 moving upwards
      if (current >= 1.5 && (previous ?? 0) < 1.5) {
        scheduleOnRN(setIsUnlocked, true);
      }
    }
  );

  // 2. Animated Styles
  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      scale.value,
      [1, 1.5, 2],
      ['#3f3f46', '#10b981', '#059669'] // Zinc-700 to Emerald
    );

    return {
      transform: [{ scale: scale.value }],
      backgroundColor,
    };
  });

  const handlePressIn = () => {
    if (!isUnlocked) {
      scale.value = withTiming(2, { duration: 2000 });
    }
  };

  const handlePressOut = () => {
    // If they let go before it unlocked, reset it
    if (!isUnlocked) {
      scale.value = withTiming(1, { duration: 300 });
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-zinc-950">
      <Text className="text-white text-2xl font-bold mb-20">
        {isUnlocked ? 'ACCESS GRANTED 🔓' : 'HOLD TO UNLOCK 🔒'}
      </Text>

      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        <Animated.View 
          style={animatedStyle}
          className="w-32 h-32 rounded-full items-center justify-center shadow-xl"
        >
          <Text className="text-white font-semibold">
            {isUnlocked ? 'DONE' : 'HOLD'}
          </Text>
        </Animated.View>
      </Pressable>

      {isUnlocked && (
        <Pressable 
          onPress={() => { setIsUnlocked(false); scale.value = 1; }}
          className="mt-20 p-4 border border-zinc-700 rounded-lg"
        >
          <Text className="text-zinc-400">Reset Lock</Text>
        </Pressable>
      )}
    </View>
  );
}