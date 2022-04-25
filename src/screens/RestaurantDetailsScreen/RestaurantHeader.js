import { View, Text, Image } from "react-native";
import styles from "./styles";

const DEFAULT_IMAGE =
  "https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant3.jpeg";

export default function RestaurantHeader({ restaurant }) {
  return (
    <View style={styles.page}>
      <Image
        source={{ uri: restaurant.image ? restaurant.image : DEFAULT_IMAGE }}
        style={styles.image}
      />
      <View style={styles.container}>
        <Text style={styles.title}>{restaurant.name}</Text>
        <Text style={styles.subtitle}>
          $ {restaurant.deliveryFee.toFixed(1)} • {restaurant.minDeliveryTime}-
          {restaurant.maxDeliveryTime} minutes
        </Text>
      </View>
      <Text style={styles.menuTitle}>Menu</Text>
    </View>
  );
}
