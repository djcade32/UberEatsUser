import { StyleSheet, FlatList, View } from "react-native";
import { useState, useEffect } from "react";
import { DataStore } from "aws-amplify";
import { Restaurant } from "../../models";
import RestaurantItem from "../../components/RestaurantItem/Index";

export default function HomeScreen() {
  const [restaurants, setRestaurants] = useState();

  const fetchRestaurants = async () => {
    const results = await DataStore.query(Restaurant);
    setRestaurants(results);
  };

  useEffect(() => {
    fetchRestaurants();
    // Commented code is a short version of the fetchRestaurants function in one line of code.
    // DataStore.query(Restaurant).then(setRestaurants);
  }, []);

  return (
    <View style={styles.page}>
      <FlatList
        data={restaurants}
        renderItem={({ item }) => <RestaurantItem restaurant={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    padding: 10,
  },
});
