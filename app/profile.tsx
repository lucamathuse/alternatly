import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Pressable,
  ScrollView,
  Platform,
  StatusBar,
} from "react-native";
import { Image } from "expo-image";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useStore } from "../store.js";
import { useRouter } from "expo-router";

const { width, height } = Dimensions.get("window");

// Calculate a safe top padding
const TOP_INSET = Platform.OS === "android" ? StatusBar.currentHeight : 60;

export default function Profile() {
  const router = useRouter();
  const CURRENT_USER_ID = 10;

  const items = useStore((state) => state.items);
  const users = useStore((state) => state.users);

  const myItems = items.filter((item) => item.userId === CURRENT_USER_ID);
  const userProfile = users.find((u) => u.id === CURRENT_USER_ID);

  return (
    <View style={styles.mainContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: TOP_INSET, paddingBottom: 40 }}
      >
        {/* PROFILE HEADER */}
        <View style={styles.header}>
          <Image
            source={{ uri: userProfile?.avatar }}
            style={styles.avatar}
            contentFit="cover"
          />
          <Text style={styles.username}>@{userProfile?.username}</Text>
        </View>

        {/* GRID SECTION */}
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>My Items</Text>
          <View style={styles.grid}>
            {myItems.map((product) => (
              <View key={product.id} style={styles.item}>
                {/* LIKES INDICATOR (Read-only) */}
                <View style={styles.likesContainer}>
                  <BlurView
                    intensity={80}
                    tint="systemMaterialDark"
                    style={styles.likes}
                  >
                    <Image
                      style={styles.heartIcon}
                      source={require("../assets/icons/heart.svg")}
                    />
                    <Text style={styles.likesText}>{product.likes}</Text>
                  </BlurView>
                </View>

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
                      "rgba(0,0,0,0.4)",
                      "rgba(0,0,0,0.9)",
                    ]}
                    style={styles.gradient}
                  >
                    <Text style={styles.priceText}>{product.price}€</Text>
                    <Text style={styles.infoText} numberOfLines={1}>
                      {product.brand} | {product.size}
                    </Text>
                  </LinearGradient>
                </Pressable>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#1E1F22",
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#1E1F22", // Placeholder color while loading
  },
  username: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
    marginBottom: 15,
  },
  statBox: {
    alignItems: "center",
    backgroundColor: "#1E1F22",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
  },
  statNumber: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    color: "#888",
    fontSize: 12,
  },
  content: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  item: {
    width: width * 0.44,
    height: height * 0.32,
    backgroundColor: "#1E1F22",
    borderRadius: 12,
    marginBottom: 15,
    overflow: "hidden",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
  },
  likesContainer: {
    position: "absolute",
    top: 8,
    right: 8,
    zIndex: 10,
  },
  likes: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    overflow: "hidden",
  },
  heartIcon: {
    width: 10,
    height: 10,
    tintColor: "white",
  },
  likesText: {
    color: "white",
    fontSize: 11,
    fontWeight: "600",
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
    color: "#ccc",
    fontSize: 11,
  },
  priceText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
