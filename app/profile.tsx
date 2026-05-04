import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import api from "../config/api";

// COMPONENTS (NOW PROPERLY USED)
import EditProfileModal from "../components/profile/editprofile";
import SuccessPopup from "../components/profile/successpopup";

export default function Profile() {
  const router = useRouter();

  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [showEdit, setShowEdit] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await api.get("/customer/profile");

      if (res.data.success) {
        setProfile(res.data.customer);
      }
    } catch (err) {
      console.log("PROFILE ERROR:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2872A1" />
        <Text>Loading profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* SUCCESS POPUP COMPONENT */}
      <SuccessPopup
        message={successMsg}
        visible={!!successMsg}
      />

      <ScrollView>

        {/* HEADER (LOWERED SAFE AREA FIX) */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => router.back()}
          >
            <Text style={{ color: "#2872A1", fontWeight: "700" }}>
              ← Back
            </Text>
          </TouchableOpacity>

          <Image
            source={
              profile?.avatar_url
                ? { uri: profile.avatar_url }
                : require("../assets/icons/profile.png")
            }
            style={styles.avatar}
          />

          <Text style={styles.name}>
            {profile?.customer_name}
          </Text>

          <Text style={styles.subtitle}>
            Customer Profile
          </Text>
        </View>

        {/* DETAILS */}
        <View style={styles.card}>
          <Text style={styles.row}>
            Phone: {profile?.phone || "Not set"}
          </Text>

          <Text style={styles.row}>
            Gender: {profile?.gender || "Not set"}
          </Text>

          <Text style={styles.row}>
            Birth: {profile?.birth || "Not set"}
          </Text>
        </View>

        {/* EDIT BUTTON */}
        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => setShowEdit(true)}
        >
          <Text style={{ color: "#fff", fontWeight: "700" }}>
            Edit Profile
          </Text>
        </TouchableOpacity>

      </ScrollView>

      {/* EDIT PROFILE MODAL (COMPONENT USED PROPERLY) */}
      <EditProfileModal
        visible={showEdit}
        customer={profile}
        onClose={() => setShowEdit(false)}
        onUpdated={(updated: any) => {
          setProfile(updated);
          setShowEdit(false);
          setSuccessMsg("Profile updated successfully!");

          setTimeout(() => setSuccessMsg(""), 2500);
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

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    backgroundColor: "#2872A1",
    alignItems: "center",
    paddingTop: 60,   // ✅ FIX: moved lower (fix status bar conflict)
    paddingBottom: 40,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  backBtn: {
    position: "absolute",
    left: 15,
    top: 30,
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 10,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#fff",
  },

  name: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
    marginTop: 10,
  },

  subtitle: {
    color: "#fff",
    opacity: 0.8,
  },

  card: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 15,
    borderRadius: 12,
  },

  row: {
    fontSize: 14,
    marginBottom: 8,
  },

  editBtn: {
    backgroundColor: "#2872A1",
    marginHorizontal: 15,
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
});