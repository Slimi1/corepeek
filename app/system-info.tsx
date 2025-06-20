import SystemInfo from '@/components/SystemInfo';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function SystemInfoScreen() {
  return (
    <View style={styles.container}>
      <SystemInfo />
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
