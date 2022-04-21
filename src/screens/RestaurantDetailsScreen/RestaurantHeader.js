import { View, Text, Image } from "react-native";
import styles from "./styles";

export default function RestaurantHeader({ restaurant }) {
  return (
    <View style={styles.page}>
      <Image source={{ uri: restaurant.image }} style={styles.image} />
      <View style={styles.container}>
        <Text style={styles.title}>{restaurant.name}</Text>
        <Text style={styles.subtitle}>
          $ {restaurant.deliveryFee} • {restaurant.minDeliveryTime}-
          {restaurant.maxDeliveryTime} minutes
        </Text>
      </View>
      <Text style={styles.menuTitle}>Menu</Text>
    </View>
  );
}
