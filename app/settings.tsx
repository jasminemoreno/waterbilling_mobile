// app/settings.tsx

import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import api from "../config/api";

import ChangePasswordModal from "../components/profile/ChangePassword";
import EditAccountModal from "../components/profile/EditAccount";
import SuccessPopup from "../components/profile/successpopup";

export default function SettingsPage() {
  const router = useRouter();

  const [customer, setCustomer] = useState<any>({});
  const [showEdit, setShowEdit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    loadCustomer();
  }, []);

  const loadCustomer = async () => {
    try {
      const res = await api.get("/customer/settings");

      if (res.data.success) {
        setCustomer(res.data.customer);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => {
      setSuccessMsg("");
    }, 2500);
  };

  return (
    <View style={styles.container}>
      <SuccessPopup visible={!!successMsg} message={successMsg} />

      <ScrollView contentContainerStyle={styles.scroll}>

        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <Text style={styles.backText}>← Back</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Account Settings</Text>
          <Text style={styles.subtitle}>
            Manage your personal information and security
          </Text>
        </View>

        {/* ACCOUNT SECTION */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Account Information</Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Phone Number</Text>
            <Text style={styles.value}>
              {customer.phone || "Not set"}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>
              {customer.email || "Not set"}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.mainBtn}
            onPress={() => setShowEdit(true)}
          >
            <Text style={styles.btnText}>Edit Account</Text>
          </TouchableOpacity>
        </View>

        {/* SECURITY SECTION */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Privacy & Security</Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Password</Text>
            <Text style={styles.value}>•••••••••</Text>
          </View>

          <TouchableOpacity
            style={styles.mainBtn}
            onPress={() => setShowPassword(true)}
          >
            <Text style={styles.btnText}>Change Password</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* MODALS */}
      <EditAccountModal
        visible={showEdit}
        customer={customer}
        onClose={() => setShowEdit(false)}
        onUpdated={() => {
          loadCustomer();
          setShowEdit(false);
          showSuccess("Account updated successfully!");
        }}
      />

      <ChangePasswordModal
        visible={showPassword}
        onClose={() => setShowPassword(false)}
        onUpdated={() => {
          setShowPassword(false);
          showSuccess("Password updated successfully!");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CBDDE9",
  },

  scroll: {
    padding: 18,
    paddingTop: 55,
    paddingBottom: 30,
  },

  header: {
    marginBottom: 25,
  },

  backBtn: {
    backgroundColor: "#fff",
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 15,
  },

  backText: {
    color: "#5D89C2",
    fontWeight: "700",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111",
  },

  subtitle: {
    color: "#666",
    marginTop: 4,
    fontSize: 14,
  },

  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 16,
    marginBottom: 18,
    elevation: 5,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingVertical: 12,
  },

  label: {
    color: "#666",
  },

  value: {
    fontWeight: "700",
    maxWidth: "55%",
    textAlign: "right",
  },

  mainBtn: {
    backgroundColor: "#2872A1",
    marginTop: 18,
    paddingVertical: 13,
    borderRadius: 10,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "700",
  },
});