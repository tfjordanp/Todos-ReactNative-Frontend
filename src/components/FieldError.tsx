import React from "react";
import { Text, StyleSheet } from "react-native";

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <Text style={styles.err}>{message}</Text>;
}

const styles = StyleSheet.create({
  err: { color: "#b00020", fontSize: 12, marginTop: -4, marginBottom: 4 },
});
