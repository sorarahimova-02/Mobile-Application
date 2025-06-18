export type Transaction = {
  id: string;
  amount: number; // Positive for income, negative for expense
  description: string;
  date: string;
  category: string;
};