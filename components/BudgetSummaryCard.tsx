import { StyleSheet, Text, View } from 'react-native';
import { ReactNode } from 'react';

type BudgetSummaryCardProps = {
  title: string;
  value: string;
  icon: ReactNode;
  color: string;
};

export default function BudgetSummaryCard({ title, value, icon, color }: BudgetSummaryCardProps) {
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <View style={styles.iconContainer}>
        {icon}
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 12,
    color: '#1F2937',
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E3A8A',
  },
});