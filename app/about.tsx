import { useRouter } from "expo-router";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function About() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>

      {/* Back Button */}
      <TouchableOpacity style={styles.backBtn} onPress={goBack}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      {/* System Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>System Information</Text>
        <Text style={styles.sectionText}>
          The <Text style={{ fontWeight: "bold" }}>Water Billing System</Text> is a web-based platform designed to manage water consumption records, generate monthly bills, and track customer payments efficiently.
        </Text>
      </View>

      {/* System Name */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>System Name</Text>
        <Text style={styles.centerText}>Barangay Alipao Water Billing System</Text>
        <Text style={styles.version}>Version 1.0</Text>
      </View>

      {/* Developer Team */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Developer / Project Team</Text>

        <Text style={styles.label}>Developed by:</Text>

        <Text style={styles.listItem}>• Moreno, Jasmine G.</Text>
        <Text style={styles.listItem}>• Salino, Famila N.</Text>
        <Text style={styles.listItem}>• Balladares, Rasha S.</Text>

        <Text style={styles.label}>Course:</Text>
        <Text style={styles.text}>BS Information Technology</Text>

        <Text style={styles.label}>Instructor:</Text>
        <Text style={styles.text}>Cabanero, Ralph C.</Text>
      </View>

    </ScrollView>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#CBDDE9",
    },
  
    content: {
      padding: 20,
      paddingTop: 40,
    },
  
    backBtn: {
      backgroundColor: "#FFFFFF",
      padding: 10,
      borderRadius: 12,
      alignSelf: "flex-start",
      marginBottom: 20,
    },
  
    backText: {
      color: "#5D89C2",
      fontWeight: "600",
    },
  
    section: {
      backgroundColor: "white",
      padding: 20,
      borderRadius: 20,
      marginBottom: 20,
    },
  
    sectionTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: "#4a90e2",
      borderBottomWidth: 1,
      borderBottomColor: "#e0e0e0",
      paddingBottom: 8,
      marginBottom: 15,
    },
  
    sectionText: {
      fontSize: 15,
      lineHeight: 22,
      color: "#444",
    },
  
    centerText: {
      textAlign: "center",
      fontWeight: "600",
      fontSize: 16,
      marginVertical: 5,
      color: "#333",
    },
  
    version: {
      textAlign: "center",
      fontSize: 14,
      color: "#888",
    },
  
    label: {
      fontWeight: "600",
      marginTop: 10,
      marginBottom: 5,
      color: "#333",
    },
  
    text: {
      fontSize: 14,
      color: "#444",
      marginBottom: 5,
    },
  
    listItem: {
      fontSize: 14,
      color: "#444",
      marginLeft: 10,
    },
  });