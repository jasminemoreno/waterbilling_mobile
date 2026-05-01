import { Text, View, useWindowDimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

export default function WaterUsageChart({ chartLabels, chartData }: any) {
  const { width } = useWindowDimensions();

  return (
    <View style={{ width: '100%' }}>
      <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>
        Water Usage Chart
      </Text>

      <BarChart
        data={{
          labels: chartLabels || [],
          datasets: [{ data: chartData || [] }],
        }}
        width={width * 0.58}   // 👈 responsive INSIDE column
        height={220}
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          color: () => '#075B93',
        }}
        style={{
          borderRadius: 12,
        }}
      />
    </View>
  );
}