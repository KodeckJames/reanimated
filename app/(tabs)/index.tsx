import { View, Text, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { AnimatedThemeToggle } from '@/components/ThemeToggle'

import Animated, {useAnimatedStyle, useSharedValue, withTiming, interpolateColor, useDerivedValue} from 'react-native-reanimated'
import { scheduleOnUI } from 'react-native-worklets';

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

  // useDerivedValue hook
  const currentNumber = useSharedValue(0);
  const nextNumber = useDerivedValue(() => {
    const next = currentNumber.value + 1;
    console.log(
      `
      [UseDerivedValue]
      curr:${currentNumber.value}
      next:${next}
      `
    );    
    return next
  })
  const increasedNumber = () => {
    currentNumber.value += 1;
  }

  // Scaling logic using useDerivedValue
  const scaleValue = useSharedValue(1);
  const animateScale = useAnimatedStyle(() => {
    return {
      transform:[{scale: scaleValue.value}]
    }
  })
  const handleScaleUp = () => {
    scaleValue.value =withTiming(scaleValue.value+0.3, {duration:300})
  }
  const handleReset = () => {
    scaleValue.value = withTiming(1, {duration:2000})
  }

  return (
    <View className=' min-h-screen flex justify-center items-center'>
      <AnimatedThemeToggle className=' absolute left-4 top-4' />
      <Pressable onPress={()=>handleReset()} className=' p-4 rounded-xl bg-teal-500 absolute left-20 top-4'>
        <Text className=' text-foreground'>Reset</Text>
      </Pressable>
      <Animated.View style={animatedStyle} className=' bg-orange-500 w-24 h-24 rounded-full'/>
      <Pressable onPress={()=>handlePress()}>
        <Animated.View style={animatedBg} className=' w-24 h-24 rounded-full mt-4' />
      </Pressable>
      <Pressable onPress={()=>handleScaleUp()} onLongPress={()=>handleReset()} >
        <Animated.View style={animateScale} className=' w-24 h-24 bg-yellow-500 rounded-full mt-4' />
      </Pressable>
    </View>
  )
}