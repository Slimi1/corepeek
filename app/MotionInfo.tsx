import DeviceMotionInfo from '@/components/MotionInfo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function MotionInfoScreen() {
  return (
    <View style={styles.container}>
      <Text className="text-2xl font-bold text-white">Motion</Text>
      <DeviceMotionInfo />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
