import React from 'react';
import { YStack, XStack, Text } from 'tamagui';

export interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
}

const alertConfig = {
  success: {
    backgroundColor: '#ecfdf5',
    borderColor: '#10b981',
    textColor: '#047857',
    iconColor: '#10b981',
  },
  error: {
    backgroundColor: '#fef2f2',
    borderColor: '#ef4444',
    textColor: '#b91c1c',
    iconColor: '#ef4444',
  },
  warning: {
    backgroundColor: '#fffbeb',
    borderColor: '#f59e0b',
    textColor: '#92400e',
    iconColor: '#f59e0b',
  },
  info: {
    backgroundColor: '#eff6ff',
    borderColor: '#0ea5e9',
    textColor: '#075985',
    iconColor: '#0ea5e9',
  },
};

export function Alert({ type, title, message }: AlertProps) {
  const config = alertConfig[type];

  return (
    <YStack
      backgroundColor={config.backgroundColor}
      borderLeftWidth={4}
      borderLeftColor={config.borderColor}
      paddingVertical={12}
      paddingHorizontal={14}
      borderRadius={6}
      gap="$1"
    >
      {title && (
        <Text fontSize={14} fontWeight="600" color={config.textColor}>
          {title}
        </Text>
      )}
      <Text fontSize={13} color={config.textColor} lineHeight={20}>
        {message}
      </Text>
    </YStack>
  );
}
