import { DeviceMotion, DeviceMotionMeasurement } from "expo-sensors";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const DeviceMotionInfo = () => {
  const [motionData, setMotionData] = useState<DeviceMotionMeasurement | null>(null);

  useEffect(() => {
    // Subscribe to device motion updates
    const subscription = DeviceMotion.addListener((data) => {
      setMotionData(data);
    });

    // Set update interval (in ms)
    DeviceMotion.setUpdateInterval(10);

    return () => {
      subscription.remove();
    };
  }, []);

  // Helper to safely render nested data
  const safeValue = (obj: any, key: string) =>
    obj && obj[key] != null ? String(obj[key]) : "N/A";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Device Motion Info</Text>

      <Text style={styles.info}>Interval: {motionData?.interval ?? "N/A"} ms</Text>

      <Text style={styles.info}>
        Acceleration (m/s²):{" "}
        {motionData?.acceleration
          ? `x: ${motionData.acceleration.x.toFixed(2)}, y: ${motionData.acceleration.y.toFixed(2)}, z: ${motionData.acceleration.z.toFixed(2)}`
          : "N/A"}
      </Text>

      <Text style={styles.info}>
        Acceleration Including Gravity (m/s²):{" "}
        {motionData?.accelerationIncludingGravity
          ? `x: ${motionData.accelerationIncludingGravity.x.toFixed(2)}, y: ${motionData.accelerationIncludingGravity.y.toFixed(2)}, z: ${motionData.accelerationIncludingGravity.z.toFixed(2)}`
          : "N/A"}
      </Text>

      <Text style={styles.info}>
        Rotation (degrees):{" "}
        {motionData?.rotation
          ? `alpha: ${motionData.rotation.alpha.toFixed(2)}, beta: ${motionData.rotation.beta.toFixed(2)}, gamma: ${motionData.rotation.gamma.toFixed(2)}`
          : "N/A"}
      </Text>

      <Text style={styles.info}>
        Rotation Rate (deg/s):{" "}
        {motionData?.rotationRate
          ? `alpha: ${motionData.rotationRate.alpha.toFixed(2)}, beta: ${motionData.rotationRate.beta.toFixed(2)}, gamma: ${motionData.rotationRate.gamma.toFixed(2)}`
          : "N/A"}
      </Text>

      <Text style={styles.info}>Orientation: {motionData?.orientation ?? "N/A"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  info: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 5,
  },
});

export default DeviceMotionInfo;
