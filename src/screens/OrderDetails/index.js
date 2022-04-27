import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useState, useEffect } from "react";
import orders from "../../../assets/data/orders.json";
import restaurants from "../../../assets/data/restaurants.json";
import BasketDishItem from "../../components/BasketDishItem";
import OrderListItem from "../../components/OrderListItem";
import styles from "./styles";
import { useOrderContext } from "../../contexts/OrderContext";
import { useRoute } from "@react-navigation/native";

function OrderDetailsHeader({ order }) {
  return (
    <View>
      <View style={styles.page}>
        <Image source={{ uri: order.Restaurant.image }} style={styles.image} />
        <View style={styles.container}>
          <Text style={styles.title}>{order.Restaurant.name}</Text>
          <Text style={styles.subtitle}>{order.status} • 2 days ago</Text>
        </View>
        <Text style={styles.menuTitle}>Your orders</Text>
      </View>
    </View>
  );
}

export default function OrderDetails() {
  const [order, setOrder] = useState();
  const { getOrder } = useOrderContext();
  const route = useRoute();
  const id = route.params?.id;

  useEffect(() => {
    getOrder(id).then(setOrder);
  }, []);

  if (!order) {
    return <ActivityIndicator size={"large"} color="gray" />;
  }

  return (
    <FlatList
      ListHeaderComponent={() => <OrderDetailsHeader order={order} />}
      data={order.dishes}
      renderItem={({ item }) => <BasketDishItem basketDish={item} />}
    />
  );
}
