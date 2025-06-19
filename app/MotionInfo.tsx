import DeviceMotionInfo from '@/components/MotionInfo';
import { ThemedText } from '@/components/ThemedText';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function MotionInfoScreen() {
  return (
    <View style={styles.container}>
      <ThemedText type="title">Motion</ThemedText>
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
