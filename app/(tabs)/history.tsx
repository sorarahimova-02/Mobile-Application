import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { Calendar, Filter } from 'lucide-react-native';
import { useBudget } from '@/context/budget-context';
import { formatCurrency } from '@/utils/format-currency';
import TransactionItem from '@/components/TransactionItem';

export default function History() {
  const { transactions } = useBudget();
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  const filteredTransactions = transactions.filter(transaction => {
    if (selectedFilter === 'income') {
      return transaction.amount > 0;
    } else if (selectedFilter === 'expense') {
      return transaction.amount < 0;
    }
    return true; // 'all' filter
  });
  
  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.filterRow}>
        <View style={styles.dateSelector}>
          <Calendar size={16} color="#6B7280" />
          <Text style={styles.dateText}>This Month</Text>
        </View>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setFilterVisible(!filterVisible)}
        >
          <Filter size={16} color="#6B7280" />
          <Text style={styles.filterText}>Filter</Text>
        </TouchableOpacity>
      </View>
      
      {filterVisible && (
        <View style={styles.filterOptions}>
          <TouchableOpacity
            style={[
              styles.filterOption,
              selectedFilter === 'all' && styles.filterOptionSelected,
            ]}
            onPress={() => setSelectedFilter('all')}
          >
            <Text style={[
              styles.filterOptionText,
              selectedFilter === 'all' && styles.filterOptionTextSelected,
            ]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterOption,
              selectedFilter === 'income' && styles.filterOptionSelected,
            ]}
            onPress={() => setSelectedFilter('income')}
          >
            <Text style={[
              styles.filterOptionText,
              selectedFilter === 'income' && styles.filterOptionTextSelected,
            ]}>Income</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterOption,
              selectedFilter === 'expense' && styles.filterOptionSelected,
            ]}
            onPress={() => setSelectedFilter('expense')}
          >
            <Text style={[
              styles.filterOptionText,
              selectedFilter === 'expense' && styles.filterOptionTextSelected,
            ]}>Expenses</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
  
  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No transactions found</Text>
      <Text style={styles.emptySubtext}>Transactions you add will appear here</Text>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <FlatList
        data={filteredTransactions}
        renderItem={({ item }) => <TransactionItem transaction={item} />}
        keyExtractor={item => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyList}
        contentContainerStyle={filteredTransactions.length === 0 ? { flex: 1 } : { paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  dateText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  filterText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
  },
  filterOptions: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-between',
  },
  filterOption: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  filterOptionSelected: {
    backgroundColor: '#DBEAFE',
  },
  filterOptionText: {
    color: '#6B7280',
    fontWeight: '500',
  },
  filterOptionTextSelected: {
    color: '#1E3A8A',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});