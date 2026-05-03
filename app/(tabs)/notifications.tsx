import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import api from "../../config/api";

import ConfirmModal from "../../components/ConfirmModal";
import NotificationCard from "../../components/NotificationCard";

type Notification = {
  id: number;
  message: string;
  type: string;
  read: boolean;
  created_at: string;
};

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  // ================= FETCH =================
  const fetchNotifications = async () => {
    try {
      const res = await api.get("/customer/notifications");
      setNotifications(res.data.notifications || []);
    } catch (err) {
      console.log("Failed to load notifications", err);
    } finally {
      setLoading(false);
    }
  };

  // ================= FIRST LOAD =================
  useEffect(() => {
    fetchNotifications();
  }, []);

  // ================= POLLING =================
  useFocusEffect(
    useCallback(() => {
      fetchNotifications(); // refresh immediately

      const interval = setInterval(() => {
        fetchNotifications(); // auto refresh every 10 sec
      }, 10000);

      return () => clearInterval(interval);
    }, [])
  );

  // ================= DELETE =================
  const removeNotification = (id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // ================= READ =================
  const markAsRead = async (id: number) => {
    try {
      await api.patch(`/customer/notifications/${id}/read`);

      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, read: true } : n
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  // ================= OPEN MODAL =================
  const openConfirm = (id: number) => {
    setSelectedId(id);
    setShowConfirm(true);
  };

  // ================= CONFIRM DELETE =================
  const confirmDelete = async () => {
    if (!selectedId) return;

    try {
      await api.delete(`/customer/notifications/${selectedId}`);
      removeNotification(selectedId);
    } catch (err) {
      console.log("Delete failed", err);
    } finally {
      setShowConfirm(false);
      setSelectedId(null);
    }
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#2872A1" />
      </View>
    );
  }

  // ================= UI =================
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <NotificationCard
            note={item}
            onDelete={() => openConfirm(item.id)}
            onRead={() => markAsRead(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>No notifications yet.</Text>
        }
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      />

      <ConfirmModal
        show={showConfirm}
        message="Are you sure you want to delete this notification?"
        onConfirm={confirmDelete}
        onCancel={() => setShowConfirm(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CBDDE9",
    padding: 15,
  },

  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2872A1",
    textAlign: "center",
    marginBottom: 15,
  },

  empty: {
    textAlign: "center",
    marginTop: 20,
    color: "#6c757d",
  },

  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CBDDE9",
  },
});