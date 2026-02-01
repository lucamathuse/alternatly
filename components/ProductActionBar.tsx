import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import { useStore } from "../store";

export function ProductActionBar({ productId }: { productId: string }) {
  const items = useStore((state) => state.items);
  const product = items.find((p) => p.id.toString() === productId);

  if (!product) return null;

  return (
    <BlurView intensity={90} tint="systemMaterialDark" style={styles.container}>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{product.price}€</Text>
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity style={[styles.button, styles.offerButton]}>
          <Text style={styles.buttonText}>Offer</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.buyButton]}>
          <Text style={styles.buttonText}>Buy</Text>
        </TouchableOpacity>
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#1A1A1A",
    borderRadius: 15,
    padding: 12,
    alignItems: "center",
    marginBottom: 10, // Space between this and NavBar
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#333",
  },
  priceContainer: {
    flex: 1,
  },
  price: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    minWidth: 80,
    alignItems: "center",
  },
  offerButton: {
    backgroundColor: "#333",
  },
  buyButton: {
    backgroundColor: "#FFF",
  },
  buttonText: {
    fontWeight: "600",
    color: "#000", // Buy text
  },
});
