import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import orders from "../../../assets/data/orders.json";
import restaurants from "../../../assets/data/restaurants.json";
import BasketDishItem from "../../components/BasketDishItem";
import OrderListItem from "../../components/OrderListItem";
import styles from "./styles";

const order = orders[0];

function OrderDetailsHeader() {
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
  return (
    <FlatList
      ListHeaderComponent={OrderDetailsHeader}
      data={restaurants[0].dishes}
      renderItem={({ item }) => <BasketDishItem basketDish={item} />}
    />
  );
}
