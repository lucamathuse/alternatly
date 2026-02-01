import React, { useState } from "react";
import { Image } from "expo-image";
import { BlurView } from "expo-blur";
import {
  View,
  StyleSheet,
  Pressable,
  Modal,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter, usePathname } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { useStore } from "../store";

export function NavBar() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const pathname = usePathname();

  // Zustand State
  const { isUploadModalOpen, setUploadModalOpen, addItem } = useStore();

  // Local Form State
  const [images, setImages] = useState<string[]>([]);
  const [form, setForm] = useState({
    title: "",
    price: "",
    size: "",
    brand: "",
    description: "",
    category: "",
    style: "",
    gender: "non-binary",
  });

  // Navigation Logic
  const navigateTo = (path: string) => {
    if (pathname === path) return;
    router.push(path);
  };

  const isActive = (path: string) => pathname === path;

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: 10 - images.length,
      quality: 0.7,
    });

    if (!result.canceled) {
      const selectedUris = result.assets.map((asset) => asset.uri);
      setImages([...images, ...selectedUris].slice(0, 10));
    }
  };

  const handlePost = () => {
    if (!form.title || images.length === 0) return;

    const newItem = {
      ...form,
      id: Date.now().toString(),
      userId: 10,
      price: parseFloat(form.price) || 0,
      image: images[0],
      images: images,
      likes: 0,
      viewed: false,
    };

    addItem(newItem);
    closeAndReset();
  };

  const closeAndReset = () => {
    setUploadModalOpen(false);
    setImages([]);
    setForm({
      title: "",
      price: "",
      size: "",
      brand: "",
      description: "",
      category: "",
      style: "",
      gender: "non-binary",
    });
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom || 10 }]}>
      <View style={styles.bottomContainer}>
        {/* Main Navigation Bar */}
        <BlurView
          intensity={90}
          tint="systemMaterialDark"
          style={styles.navBarContainer}
        >
          <Pressable
            onPress={() => navigateTo("/")}
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
          >
            <Image
              style={[styles.icon, { opacity: isActive("/") ? 1 : 0.5 }]}
              source={require("../assets/icons/home.svg")}
            />
          </Pressable>

          <Pressable
            onPress={() => navigateTo("/liked")}
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
          >
            <Image
              style={[styles.icon, { opacity: isActive("/liked") ? 1 : 0.5 }]}
              source={require("../assets/icons/heart.svg")}
            />
          </Pressable>

          <Pressable
            onPress={() => navigateTo("/profile")}
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
          >
            <Image
              style={[styles.icon, { opacity: isActive("/profile") ? 1 : 0.5 }]}
              source={require("../assets/icons/user.svg")}
            />
          </Pressable>

          <Pressable
            onPress={() => navigateTo("/messages")}
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
          >
            <Image
              style={[
                styles.icon,
                { opacity: isActive("/messages") ? 1 : 0.5 },
              ]}
              source={require("../assets/icons/message.svg")}
            />
          </Pressable>
        </BlurView>

        {/* Plus Button Container */}
        <BlurView
          intensity={90}
          tint="systemMaterialDark"
          style={styles.plusButtonContainer}
        >
          <Pressable
            style={styles.fullPressable}
            onPress={() => setUploadModalOpen(true)}
          >
            <Image
              style={styles.plusIcon}
              source={require("../assets/icons/plus.svg")}
            />
          </Pressable>
        </BlurView>
      </View>

      {/* Upload Modal */}
      <Modal
        visible={isUploadModalOpen}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <View style={[styles.modalContent, { paddingTop: insets.top }]}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={closeAndReset}>
              <Text style={styles.headerButtonText}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>New Listing</Text>
            <TouchableOpacity
              onPress={handlePost}
              disabled={images.length === 0}
            >
              <Text
                style={[
                  styles.headerButtonText,
                  {
                    color: "#007AFF",
                    fontWeight: "700",
                    opacity: images.length > 0 ? 1 : 0.5,
                  },
                ]}
              >
                Post
              </Text>
            </TouchableOpacity>
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <ScrollView contentContainerStyle={styles.formScroll}>
              {/* Image Horizontal Scroller */}
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.imagePickerRow}
              >
                <TouchableOpacity style={styles.addSquare} onPress={pickImages}>
                  <Text style={{ color: "white", fontSize: 24 }}>+</Text>
                  <Text style={{ color: "white", fontSize: 10 }}>
                    {images.length}/10
                  </Text>
                </TouchableOpacity>
                {images.map((uri, index) => (
                  <Image
                    key={index}
                    source={{ uri }}
                    style={styles.imagePreview}
                  />
                ))}
              </ScrollView>

              <TextInput
                placeholder="Title"
                placeholderTextColor="#666"
                style={styles.input}
                value={form.title}
                onChangeText={(text) => setForm({ ...form, title: text })}
              />

              <View style={styles.inputRow}>
                <TextInput
                  placeholder="Price"
                  placeholderTextColor="#666"
                  keyboardType="numeric"
                  style={[styles.input, { flex: 1, marginRight: 10 }]}
                  onChangeText={(text) => setForm({ ...form, price: text })}
                />
                <TextInput
                  placeholder="Size"
                  placeholderTextColor="#666"
                  style={[styles.input, { flex: 1 }]}
                  onChangeText={(text) => setForm({ ...form, size: text })}
                />
              </View>

              <TextInput
                placeholder="Brand"
                placeholderTextColor="#666"
                style={styles.input}
                onChangeText={(text) => setForm({ ...form, brand: text })}
              />

              <TextInput
                placeholder="Style (e.g. Goth, Emo)"
                placeholderTextColor="#666"
                style={styles.input}
                onChangeText={(text) => setForm({ ...form, style: text })}
              />

              <TextInput
                placeholder="Description"
                placeholderTextColor="#666"
                multiline
                style={[
                  styles.input,
                  { height: 100, textAlignVertical: "top" },
                ]}
                onChangeText={(text) => setForm({ ...form, description: text })}
              />
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "transparent",
    zIndex: 100,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  navBarContainer: {
    flex: 1,
    height: 65,
    borderRadius: 35,
    overflow: "hidden",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  plusButtonContainer: {
    height: 65,
    width: 65,
    borderRadius: 33,
    overflow: "hidden",
  },
  fullPressable: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    width: 25,
    height: 25,
  },
  plusIcon: {
    width: 25,
    height: 25,
  },
  // Modal Styles
  modalContent: {
    flex: 1,
    backgroundColor: "#000",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#333",
  },
  headerTitle: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
  },
  headerButtonText: {
    color: "white",
    fontSize: 16,
  },
  formScroll: {
    padding: 20,
  },
  imagePickerRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  addSquare: {
    width: 80,
    height: 80,
    backgroundColor: "#1c1c1e",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#333",
    borderStyle: "dashed",
  },
  imagePreview: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 10,
  },
  input: {
    backgroundColor: "#1c1c1e",
    color: "white",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  inputRow: {
    flexDirection: "row",
  },
});
