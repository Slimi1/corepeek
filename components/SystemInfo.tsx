import { Colors } from "@/constants/Colors";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, useColorScheme, View } from "react-native";
import DeviceInfo from "react-native-device-info";

const formatBytes = (bytes: number) => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

const SystemInfo = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme || "light"];

  const [deviceInfo, setDeviceInfo] = useState<any>(null);
  const [ramInfo, setRamInfo] = useState<{ total: number; used: number; free: number } | null>(null);

  useEffect(() => {
    const fetchInfo = async () => {
      const info = {
        brand: DeviceInfo.getBrand(),
        manufacturer: await DeviceInfo.getManufacturer(),
        model: DeviceInfo.getModel(),
        systemName: DeviceInfo.getSystemName(),
        systemVersion: DeviceInfo.getSystemVersion(),
        deviceId: DeviceInfo.getDeviceId(),
        deviceType: DeviceInfo.getDeviceType(),
      };
      setDeviceInfo(info);

      const total = await DeviceInfo.getTotalMemory();
      const used = await DeviceInfo.getUsedMemory();
      const free = total - used;
      setRamInfo({ total, used, free });
    };

    fetchInfo();
  }, []);

  if (!deviceInfo || !ramInfo) {
    return (
      <View style={[styles.container, { backgroundColor: theme.background }, styles.center]}>
        <Text style={[styles.loadingText, { color: theme.tint }]}>Loading device info...</Text>
      </View>
    );
  }

  return (
    /* I do not care enough to fix this right now */
    <ScrollView style={[styles.container, /* { backgroundColor: theme.background } */ ]}>
      <Text style={[styles.title, { color: theme.tint }]}>System Information</Text>

      <View style={[styles.infoBox, { backgroundColor: colorScheme === "dark" ? "#222" : "#eee" }]}>
        {Object.entries(deviceInfo).map(([key, value]) => (
          <Text key={key} style={[styles.infoText, { color: theme.text }]}>
            <Text style={{ fontWeight: "600", color: theme.tint }}>{key}: </Text>
            {String(value)}
          </Text>
        ))}
      </View>

      <View style={[styles.infoBox, { backgroundColor: colorScheme === "dark" ? "#333" : "#ddd" }]}>
        <Text style={[styles.sectionTitle, { color: theme.tint }]}>RAM Usage</Text>
        <Text style={[styles.infoText, { color: theme.text }]}>Total RAM: {formatBytes(ramInfo.total)}</Text>
        <Text style={[styles.infoText, { color: theme.text }]}>Used RAM: {formatBytes(ramInfo.used)}</Text>
        <Text style={[styles.infoText, { color: theme.text }]}>Free RAM: {formatBytes(ramInfo.free)}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
  },
  infoBox: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 6,
  },
});

export default SystemInfo;
