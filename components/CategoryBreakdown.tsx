import { StyleSheet, Text, View } from 'react-native';

type CategoryData = {
  category: string;
  amount: number;
  percentage: number;
};

type CategoryBreakdownProps = {
  data: CategoryData[];
};

const COLORS = [
  '#3B82F6', // blue
  '#10B981', // green
  '#F59E0B', // amber
  '#EF4444', // red
  '#8B5CF6', // purple
  '#EC4899', // pink
  '#14B8A6', // teal
  '#F97316', // orange
];

export default function CategoryBreakdown({ data }: CategoryBreakdownProps) {
  const sortedData = [...data].sort((a, b) => b.amount - a.amount);
  
  return (
    <View style={styles.container}>
      <View style={styles.chartContainer}>
        <View style={styles.chart}>
          {sortedData.map((item, index) => (
            <View
              key={item.category}
              style={[
                styles.chartSegment,
                {
                  backgroundColor: COLORS[index % COLORS.length],
                  width: `${item.percentage}%`,
                },
              ]}
            />
          ))}
        </View>
      </View>
      
      <View style={styles.legendContainer}>
        {sortedData.map((item, index) => (
          <View key={item.category} style={styles.legendItem}>
            <View style={styles.legendColorContainer}>
              <View
                style={[
                  styles.legendColor,
                  { backgroundColor: COLORS[index % COLORS.length] },
                ]}
              />
            </View>
            <View style={styles.legendTextContainer}>
              <Text style={styles.legendCategory}>{item.category}</Text>
              <Text style={styles.legendPercentage}>{item.percentage.toFixed(1)}%</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  chartContainer: {
    marginBottom: 16,
  },
  chart: {
    flexDirection: 'row',
    height: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },
  chartSegment: {
    height: '100%',
  },
  legendContainer: {
    marginTop: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  legendColorContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  legendTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 8,
  },
  legendCategory: {
    fontSize: 14,
    color: '#1F2937',
  },
  legendPercentage: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
  },
});