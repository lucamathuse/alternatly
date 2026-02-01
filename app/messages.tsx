import { View, Text } from "react-native";

// It MUST be "export default"
export default function MessageScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>No Messages yet</Text>
    </View>
  );
}
