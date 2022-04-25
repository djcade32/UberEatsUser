import { View, FlatList, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import DishListItem from "../../components/DishListItem";
import RestaurantHeader from "./RestaurantHeader";
import styles from "./styles";
import { useRoute, useNavigation } from "@react-navigation/native";
import { DataStore } from "aws-amplify";
import { Restaurant, Dish } from "../../models";

export default function RestaurantDetailsScreen() {
  const [restaurant, setRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);

  const route = useRoute();
  const navigation = useNavigation();
  const id = route.params.id;

  useEffect(() => {
    if (id) {
      // Fetch the restaurant with the id
      DataStore.query(Restaurant, id).then(setRestaurant);

      DataStore.query(Dish, (dish) => dish.restaurantID("eq", id)).then(
        setDishes
      );
    }
  }, [id]);

  if (!restaurant) {
    return <ActivityIndicator size={"large"} color="gray" />;
  }

  return (
    <View style={styles.page}>
      <FlatList
        ListHeaderComponent={() => <RestaurantHeader restaurant={restaurant} />}
        data={dishes}
        renderItem={({ item }) => <DishListItem dish={item} />}
        keyExtractor={(item) => item.name}
      />
      <Ionicons
        onPress={() => navigation.goBack()}
        name="arrow-back-circle"
        size={45}
        color="white"
        style={styles.iconContainer}
      />
    </View>
  );
}
