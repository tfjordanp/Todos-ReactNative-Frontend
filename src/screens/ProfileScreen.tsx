import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useAuth } from "../context/AuthContext";

export function ProfileScreen() {
  const { user, logout, refreshMe } = useAuth();

  return (
    <View style={styles.root}>
      <Text style={styles.h1}>Profile</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Name</Text>
        <Text style={styles.value}>{user?.name ?? "-"}</Text>

        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user?.email ?? "-"}</Text>
      </View>

      <View style={styles.row}>
        <Button title="Refresh profile" onPress={refreshMe} />
      </View>

      <View style={styles.row}>
        <Button title="Logout" onPress={logout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 16, gap: 12 },
  h1: { fontSize: 26, fontWeight: "700" },
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    gap: 6,
  },
  label: { fontSize: 12, opacity: 0.6, marginTop: 6 },
  value: { fontSize: 16, fontWeight: "600" },
  row: { marginTop: 6 },
});
