import React from "react";
import { YStack, XStack, Text } from "tamagui";
import { useAuth } from "../context/AuthContext";
import { PrimaryButton, SecondaryButton } from "../components/ui/Button";

export function ProfileScreen() {
  const { user, logout, refreshMe } = useAuth();

  return (
    <YStack flex={1} backgroundColor="$bg" padding="$5" gap="$5">
      {/* Header */}
      <YStack gap="$2" alignItems="center" paddingVertical="$4">
        <YStack
          width={80}
          height={80}
          borderRadius={40}
          backgroundColor="$colorFocus"
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize={32} fontWeight="700" color="white">
            {user?.username?.charAt(0).toUpperCase() || "U"}
          </Text>
        </YStack>
        <Text fontSize={24} fontWeight="700" color="$color">
          {user?.username || "User"}
        </Text>
        <Text fontSize={14} color="$colorPlaceholder">
          {user?.is_active ? "Active" : "Inactive"}
        </Text>
      </YStack>

      {/* Profile Card */}
      <YStack
        borderWidth={1}
        borderColor="$borderColor"
        borderRadius="$4"
        padding="$4"
        backgroundColor="$bgSecondary"
        gap="$3"
      >
        <YStack>
          <Text fontSize={12} fontWeight="600" color="$colorPlaceholder" marginBottom="$1">
            User ID
          </Text>
          <Text fontSize={16} fontWeight="600" color="$color">
            {user?.id || "-"}
          </Text>
        </YStack>

        <YStack>
          <Text fontSize={12} fontWeight="600" color="$colorPlaceholder" marginBottom="$1">
            Username
          </Text>
          <Text fontSize={16} fontWeight="600" color="$color">
            {user?.username || "-"}
          </Text>
        </YStack>

        <YStack>
          <Text fontSize={12} fontWeight="600" color="$colorPlaceholder" marginBottom="$1">
            Status
          </Text>
          <XStack alignItems="center" gap="$2">
            <YStack
              width={12}
              height={12}
              borderRadius={6}
              backgroundColor={user?.is_active ? "$success500" : "$gray400"}
            />
            <Text fontSize={16} fontWeight="600" color="$color">
              {user?.is_active ? "Active" : "Inactive"}
            </Text>
          </XStack>
        </YStack>
      </YStack>

      {/* Actions */}
      <YStack gap="$2" flex={1} justifyContent="flex-end">
        <SecondaryButton
          title="Refresh Profile"
          onPress={refreshMe}
        />
        <PrimaryButton
          title="Logout"
          onPress={logout}
        />
      </YStack>
    </YStack>
  );
}
