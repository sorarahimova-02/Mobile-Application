import { StyleSheet, Text, View } from 'react-native';

export default function SpendingTrend() {
  // In a real app, this would use actual data from transactions
  // Here we're using placeholder data for the chart
  const monthlyData = [
    { month: 'Jan', amount: 1800 },
    { month: 'Feb', amount: 2200 },
    { month: 'Mar', amount: 1950 },
    { month: 'Apr', amount: 2100 },
    { month: 'May', amount: 1750 },
    { month: 'Jun', amount: 1600 },
  ];
  
  const maxAmount = Math.max(...monthlyData.map(d => d.amount));
  
  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        {monthlyData.map((data, index) => {
          const barHeight = (data.amount / maxAmount) * 150; // Scale to max height of 150
          
          return (
            <View key={data.month} style={styles.barContainer}>
              <View style={styles.barLabelContainer}>
                <Text style={styles.barValue}>${data.amount}</Text>
              </View>
              <View 
                style={[
                  styles.bar, 
                  { 
                    height: barHeight,
                    backgroundColor: index === monthlyData.length - 1 ? '#1E3A8A' : '#93C5FD'
                  }
                ]} 
              />
              <Text style={styles.barLabel}>{data.month}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 180,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
  },
  barLabelContainer: {
    marginBottom: 4,
  },
  barValue: {
    fontSize: 10,
    color: '#6B7280',
  },
  bar: {
    width: 24,
    borderRadius: 4,
  },
  barLabel: {
    marginTop: 8,
    fontSize: 10,
    color: '#6B7280',
  },
});