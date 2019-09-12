import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text
        style={{ flex: 1, color: "white", fontWeight: "100", fontSize: 24 }}
      >
        Open up App.js to start working on your appu!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    flexDirection: "row",
    backgroundColor: "fuchsia",
    alignItems: "center",
    justifyContent: "center"
  }
});
