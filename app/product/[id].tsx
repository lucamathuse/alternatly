import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Image } from "expo-image";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useStore } from "../../store";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import Carousel from "react-native-reanimated-carousel";

const { width, height } = Dimensions.get("window");

export default function ProductDetail() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxVisible, setIsLightboxVisible] = useState(false);

  const items = useStore((state) => state.items);
  const users = useStore((state) => state.users);
  const toggleLike = useStore((state) => state.toggleLike);
  const likedIds = useStore((state) => state.likedIds);
  const markAsViewed = useStore((state) => state.markAsViewed);

  const product = items.find((item) => item.id.toString() === id);
  const seller = users?.find((u) => u.id === product?.userId);

  const productImages =
    product?.images && product.images.length > 0
      ? product.images
      : [product?.image];

  const sellerItems = items.filter(
    (item) => item.userId === product?.userId && item.id !== product?.id,
  );

  if (!product) return null;

  return (
    <View style={styles.container}>
      {/* --- LIGHTBOX MODAL --- */}
      <Modal
        visible={isLightboxVisible}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.lightboxOverlay}>
          <Pressable
            style={[styles.closeLightbox, { top: insets.top + 10 }]}
            onPress={() => setIsLightboxVisible(false)}
            hitSlop={20}
          >
            <BlurView intensity={30} tint="light" style={styles.closeBlur}>
              <Text style={styles.backText}>✕ Close</Text>
            </BlurView>
          </Pressable>

          <Carousel
            loop={false}
            width={width}
            height={height}
            data={productImages}
            defaultIndex={activeIndex}
            onSnapToItem={(index) => setActiveIndex(index)}
            renderItem={({ item }) => (
              <View style={styles.lightboxImageContainer}>
                <Image
                  source={{ uri: item }}
                  style={styles.lightboxImage}
                  contentFit="contain"
                />
              </View>
            )}
          />
        </View>
      </Modal>

      {/* --- BACK BUTTON --- */}
      <Pressable
        onPress={() => router.back()}
        style={[styles.backButton, { top: insets.top + 10 }]}
      >
        <Text style={styles.backText}>← Back</Text>
      </Pressable>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* --- IMAGE CAROUSEL SECTION --- */}
        <View style={styles.carouselContainer}>
          <Carousel
            loop={false}
            width={width}
            height={width * 1.33}
            data={productImages}
            // Increase the swipe threshold or pansensitivity if needed
            panGestureHandlerProps={{
              activeOffsetX: [-10, 10], // Prevents accidental vertical scrolls/taps
            }}
            onSnapToItem={(index) => setActiveIndex(index)}
            renderItem={({ item }) => (
              <Pressable
                style={{ flex: 1 }}
                // Using onPressOut or adding a small delay prevents the tap from firing during a swipe
                onPress={() => setIsLightboxVisible(true)}
              >
                <Image
                  source={{ uri: item }}
                  style={styles.fullImage}
                  contentFit="cover"
                />
              </Pressable>
            )}
          />

          {productImages.length > 1 && (
            <View style={styles.paginationContainer}>
              {productImages.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.paginationDot,
                    activeIndex === index && styles.paginationDotActive,
                  ]}
                />
              ))}
            </View>
          )}
        </View>

        <View style={styles.details}>
          <Text style={styles.brand}>{product.title}</Text>
          <View style={styles.attributeRow}>
            <Text style={styles.attributeText}>{product.gender}</Text>
            <Text style={styles.dotDivider}>•</Text>
            <Text style={styles.attributeText}>{product.size}</Text>
            <Text style={styles.dotDivider}>•</Text>
            <Text style={styles.attributeText}>{product.style}</Text>
            <Text style={styles.dotDivider}>•</Text>
            <Text style={[styles.attributeText, { color: "white" }]}>
              {product.price}€
            </Text>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          <View style={styles.userContainer}>
            <Image
              source={{ uri: seller?.avatar }}
              style={styles.avatar}
              contentFit="cover"
            />
            <View style={styles.userInfo}>
              <Text style={styles.postedBy}>Posted by</Text>
              <Text style={styles.username}>
                {seller?.username || "Anonymous Seller"}
              </Text>
            </View>
            <Pressable style={styles.followButton}>
              <Text style={styles.followButtonText}>Follow</Text>
            </Pressable>
          </View>

          {sellerItems.length > 0 && (
            <View style={styles.moreSection}>
              <Text style={styles.moreTitle}>More from {seller?.username}</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalScroll}
              >
                {sellerItems.map((item) => {
                  const isLiked = likedIds.includes(item.id);
                  return (
                    <View key={item.id} style={styles.miniCard}>
                      <TouchableOpacity
                        style={styles.likesContainer}
                        onPress={() => toggleLike(item.id)}
                      >
                        <BlurView
                          intensity={80}
                          tint="dark"
                          style={styles.likes}
                        >
                          <Text style={{ color: "white", fontSize: 10 }}>
                            {item.likes + (isLiked ? 1 : 0)}
                          </Text>
                        </BlurView>
                      </TouchableOpacity>
                      <Pressable
                        style={{ flex: 1 }}
                        onPress={() => router.push(`/product/${item.id}`)}
                      >
                        <Image
                          source={{ uri: item.image }}
                          style={styles.miniImage}
                          contentFit="cover"
                        />
                        <LinearGradient
                          colors={["transparent", "rgba(0,0,0,0.8)"]}
                          style={styles.miniGradient}
                        >
                          <Text style={styles.miniPrice} numberOfLines={1}>
                            {item.price}€
                          </Text>
                        </LinearGradient>
                      </Pressable>
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  backButton: {
    position: "absolute",
    left: 15,
    zIndex: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 20,
  },
  backText: { color: "white", fontWeight: "bold" },
  carouselContainer: { position: "relative" },
  fullImage: { width: width, height: width * 1.33 },
  paginationContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255,255,255,0.4)",
    marginHorizontal: 4,
  },
  paginationDotActive: { backgroundColor: "#fff", width: 12 },
  lightboxOverlay: { flex: 1, backgroundColor: "#000" },
  lightboxImageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  lightboxImage: { width: width, height: height },
  closeLightbox: { position: "absolute", right: 20, zIndex: 100 },
  closeBlur: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    overflow: "hidden",
  },
  details: { padding: 20 },
  brand: { color: "white", fontSize: 24, fontWeight: "bold" },
  attributeRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  attributeText: {
    color: "#888",
    fontSize: 14,
    textTransform: "uppercase",
    fontWeight: "600",
  },
  dotDivider: { color: "#888", fontSize: 14, marginHorizontal: 4 },
  descriptionContainer: {
    marginVertical: 20,
    borderTopWidth: 1,
    borderColor: "#333",
    paddingVertical: 20,
  },
  description: { color: "#888", fontSize: 16, lineHeight: 22 },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: "#222" },
  userInfo: { flex: 1, marginLeft: 12 },
  postedBy: {
    color: "#555",
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  username: { color: "white", fontSize: 16, fontWeight: "600" },
  followButton: {
    borderWidth: 1,
    borderColor: "#444",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 18,
  },
  followButtonText: { color: "white", fontSize: 14, fontWeight: "600" },
  moreSection: { marginTop: 10 },
  moreTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  horizontalScroll: { paddingRight: 20 },
  miniCard: {
    width: width * 0.35,
    height: width * 0.45,
    backgroundColor: "#1E1F22",
    borderRadius: 8,
    marginRight: 12,
    overflow: "hidden",
    position: "relative",
  },
  miniImage: { width: "100%", height: "100%", position: "absolute" },
  miniGradient: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "40%",
    justifyContent: "flex-end",
    padding: 8,
  },
  miniPrice: { color: "white", fontWeight: "bold", fontSize: 14 },
  likesContainer: { position: "absolute", top: 5, right: 5, zIndex: 20 },
  likes: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    overflow: "hidden",
  },
});
