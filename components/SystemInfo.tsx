import * as Device from 'expo-device';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const SystemInfo = () => {
  const [deviceInfo, setDeviceInfo] = useState<any>({});

  useEffect(() => {
    const fetchDeviceInfo = async () => {
      const info = {
        brand: Device.brand,
        manufacturer: Device.manufacturer,
        modelName: Device.modelName,
        osName: Device.osName,
        osVersion: Device.osVersion,
        totalMemory: Device.totalMemory,
      };
      setDeviceInfo(info);
    };

    fetchDeviceInfo();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>System Information</Text>
      {Object.entries(deviceInfo).map(([key, value]) => (
        <Text key={key} style={styles.info}>
          {key}: {String(value)}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  info: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default SystemInfo;