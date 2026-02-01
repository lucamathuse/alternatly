import React from "react";
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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useStore } from "../store.js"; // Adjust path as needed
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function LikedScreen() {
  const items = useStore((state) => state.items);
  const likedIds = useStore((state) => state.likedIds);
  const toggleLike = useStore((state) => state.toggleLike);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Filter items to only show those whose ID is in the likedIds array
  const likedItems = items.filter((item) => likedIds.includes(item.id));

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingTop: insets.top + 20,
        paddingBottom: insets.bottom + 80, // Extra padding so the navbar doesn't cover items
        paddingHorizontal: 15,
      }}
    >
      <Text style={styles.headline}>Your Favorites</Text>

      {likedItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>You haven't liked any items yet.</Text>
        </View>
      ) : (
        <View style={styles.grid}>
          {likedItems.map((product) => (
            <View key={product.id} style={styles.item}>
              {/* Like Button (to unlike from this screen) */}
              <TouchableOpacity
                style={styles.likesContainer}
                onPress={() => toggleLike(product.id)}
              >
                <BlurView intensity={90} tint="default" style={styles.likes}>
                  <Image
                    style={{ width: 12, height: 12, tintColor: "#ff4b4b" }}
                    source={require("../assets/icons/heart.svg")}
                  />
                  <Text style={{ color: "white", fontSize: 12 }}>
                    {product.likes + 1}
                  </Text>
                </BlurView>
              </TouchableOpacity>

              {/* Navigation to Product Detail */}
              <Pressable
                style={{ flex: 1 }}
                onPress={() => router.push(`/product/${product.id}`)}
              >
                <Image
                  style={styles.image}
                  source={{ uri: product.image }}
                  contentFit="cover"
                />

                <LinearGradient
                  colors={[
                    "transparent",
                    "rgba(0,0,0,0.1)",
                    "rgba(0,0,0,0.35)",
                    "rgba(0,0,0,0.6)",
                    "rgba(0,0,0,0.8)",
                  ]}
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
          ))}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Dark theme background
  },
  headline: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: "white",
  },
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
  likesContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 20,
  },
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
  infoText: {
    color: "white",
    fontSize: 12,
    opacity: 0.9,
  },
  priceText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  emptyContainer: {
    marginTop: 100,
    alignItems: "center",
  },
  emptyText: {
    color: "#888",
    fontSize: 16,
  },
});
