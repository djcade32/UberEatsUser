import { View, Text, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import restaurants from "../../../assets/data/restaurants.json";
const restaurant = restaurants[0];

export default function RestaurantDetailsScreen() {
  return (
    <View style={styles.page}>
      <Image source={{ uri: restaurant.image }} style={styles.image} />
      <View style={styles.iconContainer}>
        <Ionicons
          name="arrow-back-circle"
          size={45}
          color="white"
          style={styles.imageIcon}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>{restaurant.name}</Text>
        <Text style={styles.subtitle}>
          $ {restaurant.deliveryFee} • {restaurant.minDeliveryTime}-
          {restaurant.maxDeliveryTime} minutes
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 5 / 3,
  },
  iconContainer: {
    position: "absolute",
    top: 40,
    left: 10,
  },
  container: {
    margin: 10,
  },
  title: {
    fontSize: 35,
    fontWeight: "600",
    marginVertical: 10,
  },
  subtitle: {
    color: "grey",
    fontSize: 15,
  },
});
