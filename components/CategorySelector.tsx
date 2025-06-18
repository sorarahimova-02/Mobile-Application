import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Chrome as Home, ShoppingCart, Utensils, Bus, Film, Wifi, PiggyBank, Gift, Heart, Briefcase, CreditCard, Banknote } from 'lucide-react-native';
import { ReactNode } from 'react';

type CategoryType = {
  id: string;
  name: string;
  icon: ReactNode;
  type: 'expense' | 'income' | 'both';
};

const CATEGORIES: CategoryType[] = [
  { id: 'housing', name: 'Housing', icon: <Home size={20} color="#1E3A8A" />, type: 'expense' },
  { id: 'groceries', name: 'Groceries', icon: <ShoppingCart size={20} color="#1E3A8A" />, type: 'expense' },
  { id: 'dining', name: 'Dining', icon: <Utensils size={20} color="#1E3A8A" />, type: 'expense' },
  { id: 'transportation', name: 'Transport', icon: <Bus size={20} color="#1E3A8A" />, type: 'expense' },
  { id: 'entertainment', name: 'Entertainment', icon: <Film size={20} color="#1E3A8A" />, type: 'expense' },
  { id: 'utilities', name: 'Utilities', icon: <Wifi size={20} color="#1E3A8A" />, type: 'expense' },
  { id: 'savings', name: 'Savings', icon: <PiggyBank size={20} color="#1E3A8A" />, type: 'expense' },
  { id: 'gifts', name: 'Gifts', icon: <Gift size={20} color="#1E3A8A" />, type: 'expense' },
  { id: 'health', name: 'Health', icon: <Heart size={20} color="#1E3A8A" />, type: 'expense' },
  { id: 'salary', name: 'Salary', icon: <Briefcase size={20} color="#1E3A8A" />, type: 'income' },
  { id: 'freelance', name: 'Freelance', icon: <CreditCard size={20} color="#1E3A8A" />, type: 'income' },
  { id: 'investments', name: 'Investments', icon: <Banknote size={20} color="#1E3A8A" />, type: 'income' },
];

type CategorySelectorProps = {
  isExpense: boolean;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
};

export default function CategorySelector({ 
  isExpense, 
  selectedCategory, 
  onSelectCategory 
}: CategorySelectorProps) {
  
  const filteredCategories = CATEGORIES.filter(
    category => category.type === (isExpense ? 'expense' : 'income') || category.type === 'both'
  );

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {filteredCategories.map(category => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.categoryItem,
            selectedCategory === category.id && styles.selectedCategory,
          ]}
          onPress={() => onSelectCategory(category.id)}
        >
          <View style={styles.iconContainer}>
            {category.icon}
          </View>
          <Text style={[
            styles.categoryName,
            selectedCategory === category.id && styles.selectedCategoryName,
          ]}>
            {category.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 80,
  },
  selectedCategory: {
    // Selected state styling
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFF6FF',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  selectedCategoryName: {
    color: '#1E3A8A',
    fontWeight: '600',
  },
});