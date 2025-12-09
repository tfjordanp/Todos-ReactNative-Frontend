import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { YStack, XStack, Text, ScrollView } from "tamagui";
import { AuthStackParamList } from "../navigation/AuthStack";
import { useAuth } from "../context/AuthContext";
import { loginSchema, zodFieldErrors } from "../utils/validation";
import { TextInput } from "../components/ui/TextInput";
import { PrimaryButton, SecondaryButton } from "../components/ui/Button";
import { Alert } from "../components/ui/Alert";

type Props = NativeStackScreenProps<AuthStackParamList, "Login">;

export function LoginScreen({ navigation, route }: Props) {
  const { login, isAuthenticated } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Auto-redirect when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    }
  }, [isAuthenticated, navigation]);

  // Show success message from signup
  useEffect(() => {
    if (route.params?.success) {
      setSuccessMessage(route.params.success);
      setTimeout(() => setSuccessMessage(null), 3000);
    }
  }, [route.params?.success]);

  async function onSubmit() {
    setErrors({});
    setSuccessMessage(null);
    setErrorMessage(null);
    const parsed = loginSchema.safeParse({ username, password });
    if (!parsed.success) {
      setErrors(zodFieldErrors(parsed.error));
      return;
    }

    setBusy(true);
    try {
      await login(parsed.data);
      setUsername("");
      setPassword("");
      setSuccessMessage("Login successful!");
    } catch (e: any) {
      const errorMsg = e?.response?.data?.detail ?? "Invalid credentials. Please try again.";
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
            Welcome
          </Text>
          <Text fontSize={14} color="$colorPlaceholder">
            Sign in to your account to continue
          </Text>
        </YStack>

        {/* Success Alert */}
        {successMessage && <Alert type="success" message={successMessage} />}

        {/* Error Alert */}
        {errorMessage && <Alert type="error" title="Login Failed" message={errorMessage} />}

        {/* Form */}
        <YStack gap="$3">
          <TextInput
            label="Username"
            placeholder="Enter your username"
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
            editable={!busy}
            error={errors.username}
          />

          <TextInput
            label="Password"
            placeholder="Enter your password"
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
            title={busy ? "Signing in..." : "Sign In"}
            onPress={onSubmit}
            disabled={busy}
          />

          <SecondaryButton
            title="Create an account"
            onPress={() => navigation.navigate("Signup")}
            disabled={busy}
          />
        </YStack>
      </YStack>
    </ScrollView>
  );
}
