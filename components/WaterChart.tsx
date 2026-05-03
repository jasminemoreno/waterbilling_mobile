import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

export default function WaterUsageChart({ chartLabels, chartData }: any) {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Water Usage</Text>
      <Text style={styles.subtitle}>Monthly consumption overview</Text>

      <View style={styles.chartWrap}>
        <BarChart
          data={{
            labels: chartLabels || [],
            datasets: [{ data: chartData || [] }],
          }}
          width={width - 40}
          height={220}
          fromZero
          showValuesOnTopOfBars

          // ✅ REQUIRED BY TYPESCRIPT
          yAxisLabel=""
          yAxisSuffix=" m³"

          chartConfig={{
            backgroundGradientFrom: '#fff',
            backgroundGradientTo: '#fff',
            decimalPlaces: 0,
            color: () => '#2872A1',
            labelColor: () => '#555',
            barPercentage: 0.6,
            propsForBackgroundLines: {
              stroke: '#eee',
            },
          }}

          style={{
            borderRadius: 12,
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 15,
    elevation: 3,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2872A1',
  },

  subtitle: {
    fontSize: 12,
    color: '#777',
    marginBottom: 10,
  },

  chartWrap: {
    alignItems: 'center',
  },
});