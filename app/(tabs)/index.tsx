import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { AnimatedThemeToggle } from '@/components/ThemeToggle'

import Animated, {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated'

export default function Home() {

  const opacity = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value
    }
  })
  const fadeIn = () => {
    opacity.value=withTiming(1, {duration: 2000})
  }

  useEffect(() => {
    fadeIn()
  },[])

  return (
    <View className=' min-h-screen flex justify-center items-center'>
      <AnimatedThemeToggle className=' absolute left-4 top-4' />
      <Animated.View style={animatedStyle} className=' bg-orange-500 w-24 h-24 rounded-full'/>
    </View>
  )
}