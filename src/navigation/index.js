import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Basket from "../screens/Basket";
import DishDetailsScreen from "../screens/DishDetailsScreen";
import HomeScreen from "../screens/HomeScreen";
import OrderDetails from "../screens/OrderDetails";
import OrderScreen from "../screens/OrderScreen";
import RestaurantDetailsScreen from "../screens/RestaurantDetailsScreen";
import ProfileScreen from "../screens/ProfileScreen";

import { Foundation, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { useAuthContext } from "../contexts/AuthContext";
const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { dbUser } = useAuthContext();

  return (
    <Stack.Navigator
      initialRouteName="HomeTabs"
      screenOptions={{ headerShown: false }}
    >
      {dbUser ? (
        <Stack.Screen
          name="HomeTabs"
          component={HomeTabs}
          options={{ headerTitle: "Home" }}
        />
      ) : (
        <Stack.Screen name="Profile" component={ProfileScreen} />
      )}
    </Stack.Navigator>
  );
}

const Tab = createMaterialBottomTabNavigator();

HomeTabs = () => {
  return (
    <Tab.Navigator barStyle={{ backgroundColor: "white" }}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Foundation name="home" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="OrdersTab"
        component={OrdersStackNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="list-alt" size={24} color={color} />
          ),
          tabBarLabel: "Orders",
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-alt" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Restaurants" component={HomeScreen} />
      <HomeStack.Screen
        name="Restaurant"
        component={RestaurantDetailsScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name="Dish" component={DishDetailsScreen} />
      <HomeStack.Screen name="Basket" component={Basket} />
    </HomeStack.Navigator>
  );
};

const OrdersStack = createNativeStackNavigator();

const OrdersStackNavigator = () => {
  return (
    <OrdersStack.Navigator>
      <OrdersStack.Screen
        name="Orders"
        component={OrderScreen}
        options={{ headerTitle: "Your orders" }}
      />
      <OrdersStack.Screen name="Order" component={OrderDetails} />
    </OrdersStack.Navigator>
  );
};
