import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import {
  useColorScheme,
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { NavBar } from "../components/NavBar";
import { SearchBar } from "../components/SearchBar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useStore } from "../store";

// --- Action Bar for Product Detail Pages ---
function PriceActionBar({ productId }: { productId: string }) {
  const items = useStore((state) => state.items);
  // Ensure we compare the ID correctly based on your store's data type
  const product = items.find((item) => item.id.toString() === productId);

  if (!product) return null;

  return (
    <View style={styles.actionContainer}>
      <View>
        <Text style={styles.priceLabel}>Price</Text>
        <Text style={styles.priceValue}>{product.price}€</Text>
      </View>
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={[styles.actionButton, styles.offerButton]}>
          <Text style={styles.offerText}>Offer</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.buyButton]}>
          <Text style={styles.buyText}>Buy</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const pathname = usePathname();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) return null;

  // 1. Logic for showing SearchBar
  const showSearchBar = ["/", "/search/result", "/explore"].includes(pathname);

  // 2. Logic for Product Detail Bar
  // Checks if the path starts with /product/
  const isDetailPage = pathname.startsWith("/product/");

  // Extracts the ID from "/product/123" -> "123"
  const productId = isDetailPage ? pathname.split("/").pop() : null;

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <View
          style={{
            flex: 1,
            backgroundColor: colorScheme === "dark" ? "#000" : "#fff",
          }}
        >
          <Stack screenOptions={{ headerShown: false, animation: "none" }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="liked" />
            <Stack.Screen name="profile" />
            <Stack.Screen name="messages" />
            <Stack.Screen name="product/[id]" />
          </Stack>

          {/* Persistent Bottom UI */}
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{
              position: "absolute",
              bottom: 0,
              width: "100%",
              paddingHorizontal: 20,
              paddingBottom: Platform.OS === "ios" ? 25 : 10,
            }}
          >
            {showSearchBar && <SearchBar />}

            {isDetailPage && productId && (
              <PriceActionBar productId={productId} />
            )}

            <NavBar />
          </KeyboardAvoidingView>
        </View>
        <StatusBar style="auto" />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#121212",
    paddingVertical: 12,
    paddingRight: 16,
    paddingLeft: 20,
    borderRadius: 35,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#333",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  priceLabel: {
    color: "#888",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  priceValue: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 10,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 90,
  },
  offerButton: {
    backgroundColor: "#262626",
    borderWidth: 1,
    borderColor: "#444",
  },
  buyButton: {
    backgroundColor: "#FFFFFF",
  },
  offerText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buyText: {
    color: "black",
    fontWeight: "700",
    fontSize: 16,
  },
});
