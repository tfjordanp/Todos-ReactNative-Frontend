import React, { useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../navigation/AuthStack";
import { useAuth } from "../context/AuthContext";
import { signupSchema, zodFieldErrors } from "../utils/validation";
import { FieldError } from "../components/FieldError";

type Props = NativeStackScreenProps<AuthStackParamList, "Signup">;

export function SignupScreen({ navigation }: Props) {
  const { signup } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onSubmit() {
    setErrors({});
    setErrorMessage(null);
    const parsed = signupSchema.safeParse({ username, password });
    if (!parsed.success) {
      setErrors(zodFieldErrors(parsed.error));
      return;
    }

    setBusy(true);
    try {
      await signup(parsed.data);
      // Auto-redirect to login with success message
      navigation.replace("Login", { success: "Account created! Please log in." });
    } catch (e: any) {
      const errorMsg = e?.response?.data?.detail ?? "Signup failed. Please try again.";
      setErrorMessage(errorMsg);
    } finally {
      setBusy(false);
    }
  }

  return (
    <View style={styles.root}>
      <Text style={styles.h1}>Sign up</Text>

      {errorMessage && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder="Username"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
        editable={!busy}
      />
      <FieldError message={errors.username} />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        editable={!busy}
      />
      <FieldError message={errors.password} />

      <Button
        title={busy ? "Creating..." : "Create account"}
        onPress={onSubmit}
        disabled={busy}
      />

      <View style={styles.spacer} />

      <Button
        title="Back to login"
        onPress={() => navigation.navigate("Login")}
        disabled={busy}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20, justifyContent: "center", gap: 10 },
  h1: { fontSize: 28, fontWeight: "700", marginBottom: 10 },
  input: { borderWidth: 1, borderRadius: 8, padding: 12 },
  spacer: { height: 8 },
  successBanner: { backgroundColor: "#d4edda", padding: 12, borderRadius: 8, marginBottom: 10 },
  successText: { color: "#155724", fontSize: 14, fontWeight: "600" },
  errorBanner: { backgroundColor: "#f8d7da", padding: 12, borderRadius: 8, marginBottom: 10 },
  errorText: { color: "#721c24", fontSize: 14, fontWeight: "600" },
});
