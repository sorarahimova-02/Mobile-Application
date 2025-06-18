import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Modal } from 'react-native';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Wallet, DollarSign, X } from 'lucide-react-native';
import { useBudget } from '@/context/budget-context';
import { formatCurrency } from '@/utils/format-currency';
import BudgetSummaryCard from '@/components/BudgetSummaryCard';
import RecentTransactions from '@/components/RecentTransactions';

export default function Dashboard() {
  const { transactions, calculateBalance, calculateIncome, calculateExpenses, addTransaction } = useBudget();
  const [isLoading, setIsLoading] = useState(true);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [isExpense, setIsExpense] = useState(true);
  const [category, setCategory] = useState('other');
  
  const balance = calculateBalance();
  const income = calculateIncome();
  const expenses = calculateExpenses();
  const savingsRate = income > 0 ? ((income - expenses) / income * 100).toFixed(1) : '0';

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleAddTransaction = () => {
    if (!amount || !description) return;

    const transaction = {
      id: Date.now().toString(),
      amount: parseFloat(amount) * (isExpense ? -1 : 1),
      description,
      date: new Date().toISOString().split('T')[0],
      category,
    };

    addTransaction(transaction);
    setIsAddModalVisible(false);
    setAmount('');
    setDescription('');
    setCategory('other');
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <Text style={styles.loadingText}>Loading your financial data...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Total Balance</Text>
        <Text style={styles.balanceAmount}>{formatCurrency(balance)}</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <View style={[styles.iconContainer, styles.incomeIconContainer]}>
              <ArrowUpRight size={16} color="#10B981" />
            </View>
            <View>
              <Text style={styles.statLabel}>Income</Text>
              <Text style={styles.statValue}>{formatCurrency(income)}</Text>
            </View>
          </View>
          
          <View style={styles.statItem}>
            <View style={[styles.iconContainer, styles.expenseIconContainer]}>
              <ArrowDownRight size={16} color="#EF4444" />
            </View>
            <View>
              <Text style={styles.statLabel}>Expenses</Text>
              <Text style={styles.statValue}>{formatCurrency(expenses)}</Text>
            </View>
          </View>
        </View>
      </View>
      
      <View style={styles.budgetCards}>
        <BudgetSummaryCard 
          title="Savings Rate"
          value={`${savingsRate}%`}
          icon={<TrendingUp size={20} color="#1E3A8A" />}
          color="#DBEAFE"
        />
        <BudgetSummaryCard 
          title="Monthly Budget"
          value={formatCurrency(3000)}
          icon={<Wallet size={20} color="#1E3A8A" />}
          color="#E0E7FF"
        />
      </View>
      
      <RecentTransactions transactions={transactions.slice(0, 5)} />
      
      <TouchableOpacity 
        style={styles.quickAddButton}
        onPress={() => setIsAddModalVisible(true)}
      >
        <DollarSign size={20} color="white" />
        <Text style={styles.quickAddButtonText}>Quick Add Transaction</Text>
      </TouchableOpacity>

      <Modal
        visible={isAddModalVisible}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Transaction</Text>
              <TouchableOpacity 
                onPress={() => setIsAddModalVisible(false)}
                style={styles.closeButton}
              >
                <X size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <View style={styles.typeSelector}>
              <TouchableOpacity
                style={[styles.typeButton, isExpense && styles.typeButtonActive]}
                onPress={() => setIsExpense(true)}
              >
                <Text style={[styles.typeButtonText, isExpense && styles.typeButtonTextActive]}>
                  Expense
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.typeButton, !isExpense && styles.typeButtonActive]}
                onPress={() => setIsExpense(false)}
              >
                <Text style={[styles.typeButtonText, !isExpense && styles.typeButtonTextActive]}>
                  Income
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Amount</Text>
              <TextInput
                style={styles.input}
                value={amount}
                onChangeText={setAmount}
                placeholder="0.00"
                keyboardType="decimal-pad"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Description</Text>
              <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription}
                placeholder="Enter description"
              />
            </View>

            <TouchableOpacity
              style={styles.addTransactionButton}
              onPress={handleAddTransaction}
            >
              <Text style={styles.addTransactionButtonText}>Add Transaction</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6B7280',
  },
  balanceContainer: {
    backgroundColor: '#1E3A8A',
    padding: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#E0E7FF',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: '700',
    color: 'white',
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  incomeIconContainer: {
    backgroundColor: 'rgba(16, 185, 129, 0.2)',
  },
  expenseIconContainer: {
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
  },
  statLabel: {
    fontSize: 12,
    color: '#E0E7FF',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  budgetCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  quickAddButton: {
    flexDirection: 'row',
    backgroundColor: '#1E3A8A',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickAddButtonText: {
    color: 'white',
    fontWeight: '600',
    marginLeft: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  closeButton: {
    padding: 4,
  },
  typeSelector: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 4,
    marginBottom: 16,
  },
  typeButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 6,
  },
  typeButtonActive: {
    backgroundColor: 'white',
  },
  typeButtonText: {
    color: '#6B7280',
    fontWeight: '500',
  },
  typeButtonTextActive: {
    color: '#1E3A8A',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  addTransactionButton: {
    backgroundColor: '#1E3A8A',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  addTransactionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});