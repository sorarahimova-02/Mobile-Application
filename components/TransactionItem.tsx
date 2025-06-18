import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Chrome as Home, ShoppingCart, Utensils, Bus, Film, Wifi, PiggyBank, Gift, Heart, Briefcase, CreditCard, Banknote, Box, Trash2 } from 'lucide-react-native';
import { Transaction } from '@/types';
import { formatCurrency } from '@/utils/format-currency';
import { useBudget } from '@/context/budget-context';

type TransactionItemProps = {
  transaction: Transaction;
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'housing':
      return <Home size={20} color="#1E3A8A" />;
    case 'groceries':
      return <ShoppingCart size={20} color="#1E3A8A" />;
    case 'dining':
      return <Utensils size={20} color="#1E3A8A" />;
    case 'transportation':
      return <Bus size={20} color="#1E3A8A" />;
    case 'entertainment':
      return <Film size={20} color="#1E3A8A" />;
    case 'utilities':
      return <Wifi size={20} color="#1E3A8A" />;
    case 'savings':
      return <PiggyBank size={20} color="#1E3A8A" />;
    case 'gifts':
      return <Gift size={20} color="#1E3A8A" />;
    case 'health':
      return <Heart size={20} color="#1E3A8A" />;
    case 'salary':
      return <Briefcase size={20} color="#1E3A8A" />;
    case 'freelance':
      return <CreditCard size={20} color="#1E3A8A" />;
    case 'investments':
      return <Banknote size={20} color="#1E3A8A" />;
    default:
      return <Box size={20} color="#1E3A8A" />;
  }
};

export default function TransactionItem({ transaction }: TransactionItemProps) {
  const { description, amount, date, category } = transaction;
  const isExpense = amount < 0;
  const { deleteTransaction } = useBudget();

  const handleDelete = () => {
    Alert.alert(
      'Delete Transaction',
      'Are you sure you want to delete this transaction?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => deleteTransaction(transaction.id),
          style: 'destructive',
        },
      ]
    );
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {getCategoryIcon(category)}
      </View>
      
      <View style={styles.detailsContainer}>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      
      <View style={styles.rightContainer}>
        <Text style={[
          styles.amount,
          isExpense ? styles.expenseAmount : styles.incomeAmount
        ]}>
          {isExpense ? '-' : '+'}{formatCurrency(Math.abs(amount))}
        </Text>
        <TouchableOpacity 
          onPress={handleDelete}
          style={styles.deleteButton}
        >
          <Trash2 size={16} color="#EF4444" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  detailsContainer: {
    flex: 1,
  },
  rightContainer: {
    alignItems: 'flex-end',
  },
  description: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#6B7280',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  expenseAmount: {
    color: '#EF4444',
  },
  incomeAmount: {
    color: '#10B981',
  },
  deleteButton: {
    padding: 4,
  },
});