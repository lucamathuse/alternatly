import React, { useState } from "react";
import { Image } from "expo-image";
import { BlurView } from "expo-blur";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useStore } from "../../store.js";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function ResultScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    size: null,
    gender: null,
    category: null,
    style: null,
  });

  const items = useStore((state) => state.items);
  const searchQuery = useStore((state) => state.searchQuery);
  const toggleLike = useStore((state) => state.toggleLike);
  const likedIds = useStore((state) => state.likedIds);
  const markAsViewed = useStore((state) => state.markAsViewed);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Handle Filter Selection
  const toggleFilter = (type, value) => {
    setActiveFilters((prev) => ({
      ...prev,
      [type]: prev[type] === value ? null : value,
    }));
  };

  // Master Filter Logic
  const filteredItems = items.filter((item) => {
    // 1. Check Search Query
    const matchesSearch =
      searchQuery.trim().length > 0
        ? item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.style.toLowerCase().includes(searchQuery.toLowerCase())
        : item.viewed === true;

    // 2. Check Active Filters
    const matchesSize = !activeFilters.size || item.size === activeFilters.size;
    const matchesGender =
      !activeFilters.gender ||
      item.gender === activeFilters.gender.toLowerCase();
    const matchesCategory =
      !activeFilters.category ||
      item.category === activeFilters.category.toLowerCase();
    const matchesStyle =
      !activeFilters.style || item.style === activeFilters.style.toLowerCase();

    return (
      matchesSearch &&
      matchesSize &&
      matchesGender &&
      matchesCategory &&
      matchesStyle
    );
  });

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 20,
          paddingBottom: insets.bottom + 80,
          paddingHorizontal: 15,
        }}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headline}>
            {searchQuery ? `Results for "${searchQuery}"` : "Recently Viewed"}
          </Text>

          <Pressable
            style={styles.plusButton}
            onPress={() => setModalVisible(true)}
          >
            <Image
              style={styles.plusIcon}
              source={require("../../assets/icons/filter.svg")}
              contentFit="contain"
            />
          </Pressable>
        </View>

        {filteredItems.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchQuery
                ? "No items found for your filters."
                : "No recently viewed items."}
            </Text>
          </View>
        ) : (
          <View style={styles.grid}>
            {filteredItems.map((product) => {
              const isLiked = likedIds.includes(product.id);
              return (
                <View key={product.id} style={styles.item}>
                  <TouchableOpacity
                    style={styles.likesContainer}
                    onPress={() => toggleLike(product.id)}
                  >
                    <BlurView
                      intensity={90}
                      tint="default"
                      style={styles.likes}
                    >
                      <Image
                        style={{
                          width: 12,
                          height: 12,
                          tintColor: isLiked ? "#ff4b4b" : "white",
                        }}
                        source={require("../../assets/icons/heart.svg")}
                      />
                      <Text style={{ color: "white", fontSize: 12 }}>
                        {product.likes + (isLiked ? 1 : 0)}
                      </Text>
                    </BlurView>
                  </TouchableOpacity>

                  <Pressable
                    style={{ flex: 1 }}
                    onPress={() => {
                      markAsViewed(product.id);
                      router.push(`/product/${product.id}`);
                    }}
                  >
                    <Image
                      style={styles.image}
                      source={{ uri: product.image }}
                      contentFit="cover"
                    />
                    <LinearGradient
                      colors={["transparent", "rgba(0,0,0,0.8)"]}
                      style={styles.gradient}
                    >
                      <View style={{ flexDirection: "row", gap: 5 }}>
                        <Text style={styles.infoText}>{product.brand}</Text>
                        <Text style={styles.infoText}>|</Text>
                        <Text style={styles.infoText}>{product.size}</Text>
                      </View>
                      <Text style={styles.priceText}>{product.price}€</Text>
                    </LinearGradient>
                  </Pressable>
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>

      {/* FILTER MODAL */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <BlurView
            intensity={20}
            tint="dark"
            style={StyleSheet.absoluteFill}
          />
          <Pressable
            style={styles.modalContent}
            onPress={(e) => e.stopPropagation()}
          >
            <BlurView
              intensity={100}
              tint="systemMaterialDark"
              style={styles.modalInternalBlur}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 15,
                }}
              >
                <Text style={styles.modalTitle}>Filters</Text>
                <TouchableOpacity
                  onPress={() =>
                    setActiveFilters({
                      size: null,
                      gender: null,
                      category: null,
                      style: null,
                    })
                  }
                >
                  <Text style={{ color: "#ff4b4b", fontSize: 12 }}>
                    Clear All
                  </Text>
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                <FilterSection
                  label="Size"
                  type="size"
                  options={["XS", "S", "M", "L", "XL"]}
                  activeValue={activeFilters.size}
                  onSelect={toggleFilter}
                />
                <FilterSection
                  label="Gender"
                  type="gender"
                  options={["Male", "Female", "Non-Binary"]}
                  activeValue={activeFilters.gender}
                  onSelect={toggleFilter}
                />
                <FilterSection
                  label="Category"
                  type="category"
                  options={[
                    "Shoes",
                    "Tops",
                    "Trousers",
                    "Sweaters",
                    "Jackets",
                    "Accessories",
                  ]}
                  activeValue={activeFilters.category}
                  onSelect={toggleFilter}
                />
                <FilterSection
                  label="Style"
                  type="style"
                  options={["Goth", "Punk", "Emo", "Mall-Goth"]}
                  activeValue={activeFilters.style}
                  onSelect={toggleFilter}
                />
              </ScrollView>

              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.applyButtonText}>Apply Filters</Text>
              </TouchableOpacity>
            </BlurView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

// Sub-component for filter rows
const FilterSection = ({ label, type, options, activeValue, onSelect }) => (
  <View style={styles.filterSection}>
    <Text style={styles.filterLabel}>{label}</Text>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 8 }}
    >
      {options.map((opt) => {
        const isSelected = activeValue === opt;
        return (
          <TouchableOpacity
            key={opt}
            onPress={() => onSelect(type, opt)}
            style={[styles.filterChip, isSelected && styles.filterChipActive]}
          >
            <Text
              style={[
                styles.filterChipText,
                isSelected && styles.filterChipTextActive,
              ]}
            >
              {opt}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  headline: { fontSize: 24, fontWeight: "bold", color: "white" },
  plusButton: { padding: 5 },
  plusIcon: { width: 25, height: 25, tintColor: "white" },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  item: {
    width: width * 0.44,
    height: height * 0.35,
    backgroundColor: "#1E1F22",
    borderRadius: 10,
    marginBottom: 15,
    position: "relative",
    overflow: "hidden",
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 10,
    position: "absolute",
  },
  likesContainer: { position: "absolute", top: 10, right: 10, zIndex: 20 },
  likes: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    overflow: "hidden",
  },
  gradient: {
    height: "50%",
    width: "100%",
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 10,
    justifyContent: "flex-end",
    paddingBottom: 12,
  },
  infoText: { color: "white", fontSize: 12, opacity: 0.9 },
  priceText: { color: "white", fontWeight: "bold", fontSize: 16 },
  emptyContainer: { marginTop: 100, alignItems: "center" },
  emptyText: { color: "#888", fontSize: 16, textAlign: "center" },

  // MODAL STYLES
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalContent: {
    width: width - 30,
    height: height / 2.2,
    borderRadius: 20,
    overflow: "hidden",
  },
  modalInternalBlur: { flex: 1, padding: 20 },
  modalTitle: { color: "white", fontSize: 20, fontWeight: "bold" },
  filterSection: { marginBottom: 20 },
  filterLabel: {
    color: "#888",
    fontSize: 12,
    textTransform: "uppercase",
    marginBottom: 8,
    fontWeight: "600",
  },
  filterChip: {
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 15,
  },
  filterChipActive: { backgroundColor: "white" },
  filterChipText: { color: "white", fontSize: 13 },
  filterChipTextActive: { color: "black", fontWeight: "bold" },
  applyButton: {
    backgroundColor: "white",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },
  applyButtonText: { color: "black", fontWeight: "bold", fontSize: 16 },
});
