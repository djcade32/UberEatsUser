import { View, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import restaurants from "../../../assets/data/restaurants.json";
import DishListItem from "../../components/DishListItem";
import RestaurantHeader from "./RestaurantHeader";
import styles from "./styles";
import { useRoute, useNavigation } from "@react-navigation/native";

const restaurant = restaurants[0];

export default function RestaurantDetailsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const id = route.params.id;
  console.warn(id);
  return (
    <View style={styles.page}>
      <FlatList
        ListHeaderComponent={() => <RestaurantHeader restaurant={restaurant} />}
        data={restaurant.dishes}
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
