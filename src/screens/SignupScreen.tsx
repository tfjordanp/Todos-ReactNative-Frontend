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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit() {
    setErrors({});
    const parsed = signupSchema.safeParse({ name, email, password });
    if (!parsed.success) {
      setErrors(zodFieldErrors(parsed.error));
      return;
    }

    setBusy(true);
    try {
      await signup(parsed.data);
    } catch (e: any) {
      Alert.alert("Signup failed", e?.response?.data?.detail ?? "Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <View style={styles.root}>
      <Text style={styles.h1}>Sign up</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        editable={!busy}
      />
      <FieldError message={errors.name} />

      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        editable={!busy}
      />
      <FieldError message={errors.email} />

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
});
