import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Transaction } from '@/types';

// Mock initial data
const initialTransactions: Transaction[] = [
  {
    id: '1',
    amount: -45.50,
    description: 'Grocery Shopping',
    date: '2023-05-15',
    category: 'groceries',
  },
  {
    id: '2',
    amount: -25.00,
    description: 'Restaurant Dinner',
    date: '2023-05-14',
    category: 'dining',
  },
  {
    id: '3',
    amount: 1200.00,
    description: 'Salary Deposit',
    date: '2023-05-01',
    category: 'salary',
  },
  {
    id: '4',
    amount: -35.99,
    description: 'Internet Bill',
    date: '2023-05-10',
    category: 'utilities',
  },
  {
    id: '5',
    amount: -15.50,
    description: 'Movie Tickets',
    date: '2023-05-12',
    category: 'entertainment',
  },
];

type BudgetContextType = {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'> & { id?: string }) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (transaction: Transaction) => void;
  calculateBalance: () => number;
  calculateIncome: () => number;
  calculateExpenses: () => number;
};

const BudgetContext = createContext<BudgetContextType | undefined>(undefined);

type BudgetProviderProps = {
  children: ReactNode;
};

export function BudgetProvider({ children }: BudgetProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  
  const addTransaction = (transaction: Omit<Transaction, 'id'> & { id?: string }) => {
    const newTransaction = {
      ...transaction,
      id: transaction.id || Date.now().toString(),
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };
  
  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };
  
  const updateTransaction = (transaction: Transaction) => {
    setTransactions(prev => 
      prev.map(t => t.id === transaction.id ? transaction : t)
    );
  };
  
  const calculateBalance = () => {
    return transactions.reduce((total, transaction) => total + transaction.amount, 0);
  };
  
  const calculateIncome = () => {
    return transactions
      .filter(t => t.amount > 0)
      .reduce((total, t) => total + t.amount, 0);
  };
  
  const calculateExpenses = () => {
    return Math.abs(transactions
      .filter(t => t.amount < 0)
      .reduce((total, t) => total + t.amount, 0));
  };
  
  return (
    <BudgetContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        updateTransaction,
        calculateBalance,
        calculateIncome,
        calculateExpenses,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  const context = useContext(BudgetContext);
  if (context === undefined) {
    throw new Error('useBudget must be used within a BudgetProvider');
  }
  return context;
}