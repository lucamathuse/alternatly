// Modules
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView, View, KeyboardAvoidingView, Platform } from "react-native";

// Components
import { SearchBar } from "@/components/SearchBar";
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
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <SearchBar insets={insets} />
            </KeyboardAvoidingView>
        </View>
    );
}
