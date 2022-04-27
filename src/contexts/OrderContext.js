import { createContext, useState, useEffect, useContext } from "react";
import { DataStore } from "aws-amplify";
import { Basket, Order, OrderDish } from "../models";
import { useAuthContext } from "./AuthContext";
import { useBasketContext } from "./BasketContext";

const OrderContext = createContext({});

function OrderContextProvider(props) {
  const { dbUser } = useAuthContext();
  const { restaurant, totalPrice, basketDishes, basket } = useBasketContext();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    DataStore.query(Order, (o) => o.userID("eq", dbUser.id)).then(setOrders);
  }, [dbUser]);

  async function createOrder() {
    console.warn("Pressed");
    const newOrder = await DataStore.save(
      new Order({
        userID: dbUser.id,
        Restaurant: restaurant,
        status: "NEW",
        total: totalPrice,
      })
    );

    await Promise.all(
      basketDishes.map((basketDish) =>
        DataStore.save(
          new OrderDish({
            quantity: basketDish.quantity,
            orderID: newOrder.id,
            Dish: basketDish.Dish,
          })
        )
      )
    );

    await DataStore.delete(basket);

    setOrders([...orders, newOrder]);
  }

  async function getOrder(id) {
    const order = await DataStore.query(Order, id);
    const orderDishes = await DataStore.query(OrderDish, (od) =>
      od.orderID("eq", id)
    );

    return { ...order, dishes: orderDishes };
  }

  return (
    <OrderContext.Provider value={{ createOrder, orders, getOrder }}>
      {props.children}
    </OrderContext.Provider>
  );
}

export default OrderContextProvider;

export const useOrderContext = () => useContext(OrderContext);
