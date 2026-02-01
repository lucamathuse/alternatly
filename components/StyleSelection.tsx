import React, { useState } from "react";
import { View, StyleSheet, Dimensions, Text, Pressable } from "react-native";
import { useStore } from "../store.js"; // Adjust path as needed
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export function StyleSelection() {
  const allStyles = [
    "Goth",
    "Emo",
    "Punk",
    "Grunge",
    "Cyberpunk",
    "Witchy",
    "Post-Punk",
    "Vampire",
  ];
  const [showAll, setShowAll] = useState(false);

  // 1. Hook into Zustand and Router
  const setSearchQuery = useStore((state) => state.setSearchQuery);
  const router = useRouter();

  const toggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  // 2. Function to trigger search and navigate
  const handleStylePress = (styleName) => {
    setSearchQuery(styleName); // Update Zustand state
    router.push("/search/result"); // Navigate to result page
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerbox}>
        <Text style={styles.headline}>Categories</Text>
      </View>

      <View style={styles.grid}>
        {(showAll ? allStyles : allStyles.slice(0, 4)).map(
          (category, index) => (
            <Pressable
              key={index}
              onPress={() => handleStylePress(category)} // 3. Added onPress
              style={({ pressed }) => [
                styles.item,
                showAll && index < 4 ? styles.selectedStyle : null,
                pressed && { opacity: 0.7 }, // Feedback on tap
              ]}
            >
              <Text style={styles.itemText}>{category}</Text>
            </Pressable>
          ),
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerbox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headline: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "white",
  },
  container: {
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 50,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  item: {
    width: width * 0.45,
    height: 50,
    backgroundColor: "#1E1F22",
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedStyle: {
    borderColor: "white",
    borderStyle: "solid",
    borderWidth: 1,
  },
  selectedText: {
    color: "black",
  },
  itemText: {
    color: "white",
  },
});
