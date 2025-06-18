import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { AuthProvider } from '@/context/auth-context';
import { BudgetProvider } from '@/context/budget-context';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <AuthProvider>
      <BudgetProvider>
        <StatusBar style="auto" />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="auth" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </BudgetProvider>
    </AuthProvider>
  );
}