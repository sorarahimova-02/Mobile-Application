import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useBudget } from '@/context/budget-context';
import { formatCurrency } from '@/utils/format-currency';
import CategoryBreakdown from '@/components/CategoryBreakdown';
import SpendingTrend from '@/components/SpendingTrend';

export default function Insights() {
  const { transactions } = useBudget();
  
  // Calculate total expense amount
  const totalExpenses = transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  
  // Get expense categories and their amounts
  const expensesByCategory = transactions
    .filter(t => t.amount < 0)
    .reduce((acc, t) => {
      const category = t.category;
      if (!acc[category]) {
        acc[category] = 0;
      }
      acc[category] += Math.abs(t.amount);
      return acc;
    }, {});
  
  // Format data for the category breakdown component
  const categoryData = Object.entries(expensesByCategory).map(([category, amount]) => ({
    category,
    amount,
    percentage: (amount / totalExpenses) * 100,
  }));
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Financial Insights</Text>
        <Text style={styles.subtitle}>Track your spending patterns</Text>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Spending Overview</Text>
        <View style={styles.spendingOverview}>
          <View style={styles.spendingItem}>
            <Text style={styles.spendingLabel}>Total Expenses</Text>
            <Text style={styles.spendingAmount}>{formatCurrency(totalExpenses)}</Text>
          </View>
          <View style={styles.spendingItem}>
            <Text style={styles.spendingLabel}>Average/Day</Text>
            <Text style={styles.spendingAmount}>{formatCurrency(totalExpenses / 30)}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Category Breakdown</Text>
        <CategoryBreakdown data={categoryData} />
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Monthly Spending Trend</Text>
        <SpendingTrend />
      </View>
      
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Savings Projection</Text>
        <Text style={styles.projectionText}>
          Based on your current spending habits, you're on track to save approximately 
          <Text style={styles.highlightText}> $580 </Text> 
          this month.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 16,
    paddingTop: 24,
    backgroundColor: '#1E3A8A',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#E0E7FF',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  spendingOverview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  spendingItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  spendingLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  spendingAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1F2937',
  },
  projectionText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#4B5563',
  },
  highlightText: {
    color: '#10B981',
    fontWeight: '700',
  },
});