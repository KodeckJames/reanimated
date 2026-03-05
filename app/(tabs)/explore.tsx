import { useEffect } from 'react';
import { View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from 'react-native-reanimated';

export default function ExplorePage() {
  // withSequence API with TranslateY
  const TranslateY = useSharedValue(0);
  const animTranslate = useAnimatedStyle(() => {
    return {
      transform:[{translateY:TranslateY.value}]
    }
  })
  const TranslateFunc = () => {
    TranslateY.value = withDelay(3000,withRepeat(withSequence(
      withTiming(-100, {duration:1000}),
      withTiming(100, {duration:1000}),
      withTiming(0, {duration:1000})
    ), -1))
  }
  useEffect(() => {
    TranslateFunc()
  })
  return (
    <View className=' flex justify-center items-center min-h-screen'>
      <Animated.View style={animTranslate} className=' bg-purple-500 w-28 h-28 rounded-full'/>
    </View>
  )
}