import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { DataStore } from "aws-amplify";
import { Dish } from "../../models";
import { useBasketContext } from "../../contexts/BasketContext";

export default function DishDetailsScreen() {
  const [dish, setDish] = useState(null);
  const [quantityState, setQuantityState] = useState(1);
  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params.id;

  const { addDishToBasket } = useBasketContext();

  useEffect(() => {
    if (id) {
      DataStore.query(Dish, id).then(setDish);
    }
  }, [id]);

  if (!dish) {
    return <ActivityIndicator size={"large"} color="gray" />;
  }

  async function onAddToBasket() {
    await addDishToBasket(dish, quantityState);
    navigation.goBack();
  }

  function onMinus() {
    if (quantityState > 1) {
      setQuantityState(quantityState - 1);
    }
  }
  function onPlus() {
    setQuantityState(quantityState + 1);
  }
  function getTotal() {
    return (dish.price * quantityState).toFixed(2);
  }

  return (
    <View style={styles.page}>
      <Text style={styles.name}>{dish.name}</Text>
      <Text style={styles.description}>{dish.description}</Text>
      <View style={styles.separator}></View>
      <View style={styles.row}>
        <AntDesign
          name="minuscircleo"
          size={60}
          color={"black"}
          onPress={onMinus}
        />
        <Text style={styles.quantity}>{quantityState}</Text>
        <AntDesign
          name="pluscircleo"
          size={60}
          color={"black"}
          onPress={onPlus}
        />
      </View>
      <Pressable style={styles.button} onPress={onAddToBasket}>
        <Text style={styles.buttonText}>
          Add {quantityState} to basket (${getTotal()})
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    width: "100%",
    paddingVertical: 40,
    padding: 10,
  },
  name: {
    fontSize: 30,
    fontWeight: "600",
    marginVertical: 10,
  },
  description: {
    color: "grey",
  },
  separator: {
    height: 1,
    backgroundColor: "lightgray",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },
  quantity: {
    fontSize: 25,
    marginHorizontal: 20,
  },
  button: {
    backgroundColor: "black",
    marginTop: "auto",
    padding: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  },
});
