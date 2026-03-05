import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, { cancelAnimation, interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export default function Example() {
    const initialLength = useSharedValue(1);
    
    const lengthAnimate = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(initialLength.value, [1,2,3], ['blue','orange','red'])
        return {
            transform: [{ scaleX: initialLength.value }],
            backgroundColor
        }
    })
    const updateLength = () => {
        initialLength.value = withTiming(3,{duration:2000})
    }
    const stopLength = () => {
        cancelAnimation(initialLength)
    }
    const reset = () => {
        initialLength.value=withTiming(1, {duration:1000})
    }
  return (
    <View className=' flex justify-center items-center min-h-screen'>
      <Pressable onLongPress={()=>updateLength()} onPressOut={(()=>stopLength())}>
          <Animated.View style={lengthAnimate} className=' rounded-md w-32 h-10'/>
          </Pressable>
          <Pressable onPress={()=>reset()} className=' bg-emerald-700 p-3 rounded-xl absolute top-2 left-4'>
              <Text className=' text-white font-bold'>Resize</Text>
          </Pressable>
    </View>
  )
}