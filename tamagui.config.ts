import { createTamagui, createTokens } from 'tamagui';
import { createInterFont } from '@tamagui/font-inter';

const headingFont = createInterFont({
  size: {
    true: 15,
  },
  weight: {
    true: '600',
  },
  lineHeight: {
    true: 1.25,
  },
});

const bodyFont = createInterFont();

export const tokens = createTokens({
  size: {
    0: 0,
    1: 5,
    2: 10,
    3: 15,
    4: 20,
    5: 25,
    6: 30,
    7: 35,
    8: 40,
    9: 45,
    10: 50,
    true: 10,
  },
  space: {
    0: 0,
    1: 5,
    2: 10,
    3: 15,
    4: 20,
    5: 25,
    6: 30,
    7: 35,
    8: 40,
    9: 45,
    10: 50,
    true: 10,
  },
  radius: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    true: 4,
  },
  zIndex: {
    0: 0,
    1: 100,
    2: 200,
    3: 300,
    4: 400,
    5: 500,
  },
  color: {
    white: '#ffffff',
    black: '#000000',
    
    // Primary brand colors
    primary50: '#f0f9ff',
    primary100: '#e0f2fe',
    primary200: '#bae6fd',
    primary300: '#7dd3fc',
    primary400: '#38bdf8',
    primary500: '#0ea5e9',
    primary600: '#0284c7',
    primary700: '#0369a1',
    primary800: '#075985',
    primary900: '#082f49',
    
    // Success colors
    success50: '#f0fdf4',
    success100: '#dcfce7',
    success200: '#bbf7d0',
    success500: '#22c55e',
    success600: '#16a34a',
    success700: '#15803d',
    
    // Error/Danger colors
    danger50: '#fef2f2',
    danger100: '#fee2e2',
    danger200: '#fecaca',
    danger500: '#ef4444',
    danger600: '#dc2626',
    danger700: '#b91c1c',
    
    // Warning colors
    warn50: '#fffbeb',
    warn100: '#fef3c7',
    warn200: '#fde68a',
    warn500: '#eab308',
    warn600: '#ca8a04',
    warn700: '#a16207',
    
    // Neutral/Gray colors
    gray50: '#f9fafb',
    gray100: '#f3f4f6',
    gray200: '#e5e7eb',
    gray300: '#d1d5db',
    gray400: '#9ca3af',
    gray500: '#6b7280',
    gray600: '#4b5563',
    gray700: '#374151',
    gray800: '#1f2937',
    gray900: '#111827',
  },
});

export const config = createTamagui({
  defaultFont: 'body',
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  tokens,
  themes: {
    light: {
      bg: tokens.color.white,
      bgSecondary: tokens.color.gray50,
      color: tokens.color.gray900,
      colorInverse: tokens.color.white,
      colorFocus: tokens.color.primary600,
      colorPlaceholder: tokens.color.gray400,
      borderColor: tokens.color.gray200,
      borderColorFocus: tokens.color.primary500,
    },
    dark: {
      bg: tokens.color.gray900,
      bgSecondary: tokens.color.gray800,
      color: tokens.color.gray50,
      colorInverse: tokens.color.gray900,
      colorFocus: tokens.color.primary400,
      colorPlaceholder: tokens.color.gray500,
      borderColor: tokens.color.gray700,
      borderColorFocus: tokens.color.primary500,
    },
  },
});

export type AppConfig = typeof config;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}
