import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Transaction } from '@/types';
import TransactionItem from './TransactionItem';

type RecentTransactionsProps = {
  transactions: Transaction[];
};

export default function RecentTransactions({ transactions }: RecentTransactionsProps) {
  const router = useRouter();
  
  const navigateToHistory = () => {
    router.push('/(tabs)/history');
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Recent Transactions</Text>
        <TouchableOpacity style={styles.viewAllButton} onPress={navigateToHistory}>
          <Text style={styles.viewAllText}>View All</Text>
          <ChevronRight size={16} color="#1E3A8A" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.transactionsList}>
        {transactions.length > 0 ? (
          transactions.map(transaction => (
            <TransactionItem 
              key={transaction.id} 
              transaction={transaction} 
            />
          ))
        ) : (
          <Text style={styles.emptyText}>No recent transactions</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 14,
    color: '#1E3A8A',
    marginRight: 4,
  },
  transactionsList: {
    // Styling for the transactions list
  },
  emptyText: {
    textAlign: 'center',
    color: '#6B7280',
    paddingVertical: 16,
  },
});