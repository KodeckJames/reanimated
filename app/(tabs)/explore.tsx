import { useEffect } from 'react';
import { View, Pressable, Text } from 'react-native';
import Animated, { cancelAnimation, useAnimatedStyle, useSharedValue, withDelay, withRepeat, withSequence, withTiming } from 'react-native-reanimated';
import { withPause } from 'react-native-redash';

export default function ExplorePage() {
   // pause animation
  const paused = useSharedValue(false);
  const toggle = () => {
    paused.value = !paused.value;
  }
  // withSequence API with TranslateY
  const TranslateY = useSharedValue(0);
  const animTranslate = useAnimatedStyle(() => {
    return {
      transform:[{translateY:TranslateY.value}]
    }
  })
  const TranslateFunc = () => {
    'worklet';
    TranslateY.value = withPause(withDelay(3000,withRepeat(withSequence(
      withTiming(-100, {duration:1000}),
      withTiming(100, {duration:1000}),
      withTiming(0, {duration:1000})
    ), -1)), paused)
  }
  useEffect(() => {
    'worklet';
    TranslateFunc()
  })
  // Cancel Animation
  const cancelTranslateAnimation = () => {
    'worklet';
    cancelAnimation(TranslateY);
  }
 
  return (
    <View className=' flex justify-center items-center min-h-screen'>
      <Animated.View style={animTranslate} className=' bg-purple-500 w-28 h-28 rounded-full' />
      <Pressable onPress={()=>cancelTranslateAnimation()} className=' p-4 rounded-xl bg-slate-800 absolute bottom-20 left-2'>
        <Text className=' font-bold text-white'>Cancel</Text>
      </Pressable>
      <Pressable onPress={()=>toggle()} className=' p-4 rounded-xl bg-slate-800 absolute bottom-20 right-2'>
        <Text className=' font-bold text-white'>Pause/Play</Text>
      </Pressable>
    </View>
  )
}