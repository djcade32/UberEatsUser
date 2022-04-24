import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Basket from "../screens/Basket";
import DishDetailsScreen from "../screens/DishDetailsScreen";
import HomeScreen from "../screens/HomeScreen";
import OrderDetails from "../screens/OrderDetails";
import OrderScreen from "../screens/OrderScreen";
import RestaurantDetailsScreen from "../screens/RestaurantDetailsScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="Restaurant"
        component={RestaurantDetailsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
