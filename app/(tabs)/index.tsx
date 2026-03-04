import { View, Text, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { AnimatedThemeToggle } from '@/components/ThemeToggle'

import Animated, {useAnimatedStyle, useSharedValue, withTiming, interpolateColor} from 'react-native-reanimated'

export default function Home() {

  // Opacity Example
  const opacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value
    }
  })
  const fadeIn = () => {
    opacity.value=withTiming(1, {duration: 5000})
  }

  useEffect(() => {
    fadeIn()
  }, [])
  
  // Background color Example
  const bgColor = useSharedValue(0);
  const animatedBg = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(bgColor.value, [0, 1], ['red', 'purple']),
    }
  })
  const handlePress = () => {
    bgColor.value = withTiming(bgColor.value === 0 ? 1 : 0, { duration: 1000 });
  }

  return (
    <View className=' min-h-screen flex justify-center items-center'>
      <AnimatedThemeToggle className=' absolute left-4 top-4' />
      <Animated.View style={animatedStyle} className=' bg-orange-500 w-24 h-24 rounded-full'/>
      <Pressable onPress={()=>handlePress()}>
        <Animated.View style={animatedBg} className=' w-24 h-24 rounded-full mt-4' />
      </Pressable>
    </View>
  )
}