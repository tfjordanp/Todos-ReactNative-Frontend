import React from 'react';
import { Pressable, ActivityIndicator } from 'react-native';
import { YStack, Text } from 'tamagui';

export interface PrimaryButtonProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

export function PrimaryButton({
  title,
  onPress,
  disabled = false,
  loading = false,
  fullWidth = true,
}: PrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={{
        opacity: disabled || loading ? 0.6 : 1,
      }}
    >
      <YStack
        backgroundColor={disabled ? '#d1d5db' : '#0284c7'}
        paddingVertical={12}
        paddingHorizontal={16}
        borderRadius={8}
        alignItems="center"
        justifyContent="center"
        width={fullWidth ? '100%' : 'auto'}
        minHeight={48}
      >
        {loading ? (
          <ActivityIndicator color="#ffffff" />
        ) : (
          <Text fontSize={16} fontWeight="600" color="white">
            {title}
          </Text>
        )}
      </YStack>
    </Pressable>
  );
}

export function SecondaryButton({
  title,
  onPress,
  disabled = false,
  loading = false,
  fullWidth = true,
}: PrimaryButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={{
        opacity: disabled || loading ? 0.6 : 1,
      }}
    >
      <YStack
        backgroundColor="transparent"
        borderWidth={1.5}
        borderColor={disabled ? '#d1d5db' : '#0284c7'}
        paddingVertical={12}
        paddingHorizontal={16}
        borderRadius={8}
        alignItems="center"
        justifyContent="center"
        width={fullWidth ? '100%' : 'auto'}
        minHeight={48}
      >
        {loading ? (
          <ActivityIndicator color="#0284c7" />
        ) : (
          <Text fontSize={16} fontWeight="600" color={disabled ? '#d1d5db' : '#0284c7'}>
            {title}
          </Text>
        )}
      </YStack>
    </Pressable>
  );
}
