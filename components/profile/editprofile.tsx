import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";

import api from "../../config/api";

export default function EditProfileModal({
  visible,
  customer,
  onClose,
  onUpdated,
}: any) {
  const [form, setForm] = useState(customer);
  const [avatar, setAvatar] = useState<any>(null);

  const [showDate, setShowDate] = useState(false);

  useEffect(() => {
    setForm(customer);
  }, [customer]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.8,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0]);
    }
  };

  const submit = async () => {
    const formData = new FormData();

    formData.append("customer_name", form.customer_name || "");
    formData.append("phone", form.phone || "");
    formData.append("gender", form.gender || "");
    formData.append("birth", form.birth || "");

    if (avatar) {
      formData.append("avatar", {
        uri: avatar.uri,
        name: "avatar.jpg",
        type: "image/jpeg",
      } as any);
    }

    const res = await api.post("/customer/profile/update", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.data.success) {
      onUpdated(res.data.customer);
      onClose();
    }
  };

  const onDateChange = (event: any, selectedDate: any) => {
    setShowDate(false);

    if (selectedDate) {
      const date = selectedDate.toISOString().split("T")[0];
      setForm({ ...form, birth: date });
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.box}>

          {/* PROFILE IMAGE */}
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={
                avatar
                  ? { uri: avatar.uri }
                  : require("../../assets/icons/profile.png")
              }
              style={styles.avatar}
            />
            <Text style={styles.changeText}>Change Photo</Text>
          </TouchableOpacity>

          {/* NAME */}
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            value={form?.customer_name}
            onChangeText={(t) =>
              setForm({ ...form, customer_name: t })
            }
          />

          {/* PHONE */}
          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={form?.phone}
            onChangeText={(t) =>
              setForm({ ...form, phone: t })
            }
          />

          {/* GENDER DROPDOWN */}
          <Text style={styles.label}>Gender</Text>
          <View style={styles.pickerBox}>
            <Picker
              selectedValue={form?.gender}
              onValueChange={(value) =>
                setForm({ ...form, gender: value })
              }
            >
              <Picker.Item label="Select Gender" value="" />
              <Picker.Item label="Male" value="Male" />
              <Picker.Item label="Female" value="Female" />
            </Picker>
          </View>

          {/* BIRTHDATE */}
          <Text style={styles.label}>Birth Date</Text>

          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDate(true)}
          >
            <Text>
              {form?.birth || "Select birth date"}
            </Text>
          </TouchableOpacity>

          {showDate && (
            <DateTimePicker
              value={form?.birth ? new Date(form.birth) : new Date()}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onDateChange}
            />
          )}

          {/* SAVE BUTTON */}
          <TouchableOpacity style={styles.btn} onPress={submit}>
            <Text style={{ color: "#fff", fontWeight: "700" }}>
              Save Changes
            </Text>
          </TouchableOpacity>

          {/* CLOSE */}
          <TouchableOpacity onPress={onClose}>
            <Text style={{ textAlign: "center", marginTop: 10 }}>
              Close
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },

  box: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 50,
    alignSelf: "center",
  },

  changeText: {
    textAlign: "center",
    marginBottom: 10,
  },

  label: {
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 5,
    color: "#333",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 10,
  },

  pickerBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    overflow: "hidden",
  },

  btn: {
    backgroundColor: "#2872A1",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },
});