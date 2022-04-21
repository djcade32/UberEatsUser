import { View, Text, StyleSheet, FlatList } from "react-native";
import OrderListItem from "../../components/OrderListItem";
import orders from "../../../assets/data/orders.json";

export default function OrderScreen() {
  return (
    <View style={{ flex: 1, width: "100%", paddingTop: 50 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "600",
          textAlign: "center",
          marginBottom: 5,
        }}
      >
        Your orders
      </Text>
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
