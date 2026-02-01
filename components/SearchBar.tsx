import React, { useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { useStore } from "../store.js";
import { useRouter, usePathname } from "expo-router";

export const SearchBar = () => {
  const setSearchQuery = useStore((state) => state.setSearchQuery);
  const router = useRouter();
  const pathname = usePathname();

  const [localText, setLocalText] = useState("");

  const handleAction = () => {
    const trimmedText = localText.trim();

    // 1. Sync store
    setSearchQuery(trimmedText);

    // 2. Navigate if not already there
    if (pathname !== "/search/result") {
      router.push("/search/result");
    }
  };

  return (
    <BlurView
      intensity={90}
      tint="systemMaterialDark"
      style={styles.blurContainer}
    >
      <TextInput
        placeholder="Search..."
        placeholderTextColor="rgba(255,255,255,0.5)"
        style={styles.input}
        value={localText}
        onChangeText={setLocalText}
        // TRIGGER 1: When user taps the bar to type
        onFocus={handleAction}
        // TRIGGER 2: When user hits 'Search' on keyboard
        onSubmitEditing={handleAction}
        returnKeyType="search"
        autoCorrect={false}
        clearButtonMode="while-editing"
      />
    </BlurView>
  );
};

const styles = StyleSheet.create({
  blurContainer: {
    height: 45,
    width: "100%",
    borderRadius: 35,
    overflow: "hidden",
    justifyContent: "center",
    paddingHorizontal: 15,
    marginBottom: 7.5,
  },
  input: {
    height: 40,
    color: "white",
    fontSize: 16,
  },
});
