// Modules
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView, View, KeyboardAvoidingView, Platform } from "react-native";

// Components
import { NavBar } from "@/components/NavBar";
import { StyleSelection } from "@/components/StyleSelection";
import { ProductOverview } from "@/components/ProductOverview";

export default function Index() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: 80 + insets.bottom,
        }}
      >
        <StyleSelection />
        <ProductOverview />
      </ScrollView>
    </View>
  );
}
