import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { YStack, XStack, Text, ScrollView } from "tamagui";
import { AuthStackParamList } from "../navigation/AuthStack";
import { useAuth } from "../context/AuthContext";
import { signupSchema, zodFieldErrors } from "../utils/validation";
import { TextInput } from "../components/ui/TextInput";
import { PrimaryButton, SecondaryButton } from "../components/ui/Button";
import { Alert } from "../components/ui/Alert";

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
    <ScrollView flex={1} backgroundColor="$bg">
      <YStack flex={1} padding="$5" justifyContent="center" gap="$4">
        {/* Header */}
        <YStack gap="$2" alignItems="center">
          <Text fontSize={32} fontWeight="700" color="$colorFocus">
            Create Account
          </Text>
          <Text fontSize={14} color="$colorPlaceholder">
            Join us and start managing your todos
          </Text>
        </YStack>

        {/* Error Alert */}
        {errorMessage && <Alert type="error" title="Signup Failed" message={errorMessage} />}

        {/* Form */}
        <YStack gap="$3">
          <TextInput
            label="Username"
            placeholder="Choose a username"
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
            editable={!busy}
            error={errors.username}
          />

          <TextInput
            label="Password"
            placeholder="Create a strong password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            editable={!busy}
            error={errors.password}
          />
        </YStack>

        {/* Buttons */}
        <YStack gap="$3">
          <PrimaryButton
            title={busy ? "Creating..." : "Create Account"}
            onPress={onSubmit}
            disabled={busy}
          />

          <SecondaryButton
            title="Already have an account? Sign in"
            onPress={() => navigation.navigate("Login")}
            disabled={busy}
          />
        </YStack>
      </YStack>
    </ScrollView>
  );
}
