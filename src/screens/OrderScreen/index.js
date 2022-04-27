import { View, Text, StyleSheet, FlatList } from "react-native";
import OrderListItem from "../../components/OrderListItem";
import { useOrderContext } from "../../contexts/OrderContext";

export default function OrderScreen() {
  const { orders } = useOrderContext();

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
