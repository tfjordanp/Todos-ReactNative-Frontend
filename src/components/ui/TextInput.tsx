import React from 'react';
import { TextInput as RNTextInput, TextInputProps } from 'react-native';
import { YStack, XStack, Text } from 'tamagui';

interface CustomInputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export function TextInput({
  label,
  error,
  icon,
  style,
  placeholderTextColor,
  ...props
}: CustomInputProps) {
  return (
    <YStack gap="$2" width="100%">
      {label && <Text fontSize={14} fontWeight="600" color="$color">{label}</Text>}
      <XStack
        borderWidth={1}
        borderColor={error ? "$danger500" : "$borderColor"}
        borderRadius="$3"
        paddingHorizontal="$3"
        alignItems="center"
        backgroundColor="$bgSecondary"
        height={48}
      >
        {icon && <XStack marginRight="$2">{icon}</XStack>}
        <RNTextInput
          {...props}
          placeholderTextColor={placeholderTextColor || '#9ca3af'}
          style={[
            {
              flex: 1,
              fontSize: 16,
              color: '#111827',
              padding: 0,
            },
            style,
          ]}
        />
      </XStack>
      {error && (
        <Text fontSize={13} color="$danger600" fontWeight="500">
          {error}
        </Text>
      )}
    </YStack>
  );
}
