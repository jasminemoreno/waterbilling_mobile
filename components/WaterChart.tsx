import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";

export default function WaterUsageChart({ chartLabels, chartData }: any) {
  const { width } = useWindowDimensions();

  return (
    <View style={styles.card}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Water Usage</Text>
        <Text style={styles.subtitle}>Monthly consumption overview</Text>
      </View>

      {/* CHART */}
      <View style={styles.chartWrap}>
        <LineChart
          data={{
            labels: chartLabels || [],
            datasets: [
              {
                data: chartData || [],
                strokeWidth: 3,
              },
            ],
          }}
          width={width - 45}
          height={250}
          fromZero
          withInnerLines={false}
          withOuterLines={false}
          withShadow={false}
          yAxisLabel=""
          yAxisSuffix=" m³"

          chartConfig={{
            backgroundGradientFrom: "#ffffff",
            backgroundGradientTo: "#ffffff",

            decimalPlaces: 0,

            color: (opacity = 1) => `rgba(40,114,161,${opacity})`,
            labelColor: (opacity = 1) => `rgba(120,120,120,${opacity})`,

            propsForDots: {
              r: "5",
              strokeWidth: "2",
              stroke: "#ffffff",
              fill: "#2872A1",
            },

            propsForBackgroundLines: {
              stroke: "#EEF2F6",
              strokeWidth: 1,
            },

            propsForLabels: {
              fontSize: 10,
            },
          }}

          bezier
          style={styles.chart}
        />
      </View>

      {/* FOOTER */}
      <Text style={styles.footer}>
        Tip: Tap and compare monthly usage trends
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,

    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  header: {
    marginBottom: 10,
  },

  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#2872A1",
  },

  subtitle: {
    fontSize: 12,
    color: "#777",
    marginTop: 2,
  },

  chartWrap: {
    alignItems: "center",
    marginLeft: -5,
  },

  chart: {
    borderRadius: 16,
  },

  footer: {
    marginTop: 8,
    fontSize: 11,
    textAlign: "center",
    color: "#9CA3AF",
  },
});