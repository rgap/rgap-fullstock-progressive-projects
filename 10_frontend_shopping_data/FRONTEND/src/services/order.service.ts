import { CheckoutFormData, Order } from "@/models/order.model";

import { findOrCreateGuestUser } from "./user.service";

export const orders: Order[] = [];

export async function createOrder(formData: FormData): Promise<Order> {
  const { email, ...details } = Object.fromEntries(
    formData
  ) as unknown as CheckoutFormData;
  const user = await findOrCreateGuestUser(email);

  const order: Order = {
    id: Math.round(Math.random() * 1000000),
    userId: user.id,
    email,
    status: "pending",
    total: 0, // This should be calculated based on cart items
    details,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  orders.push(order);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(order);
    }, 1000);
  });
}

export function getOrdersByUser(userId: number): Promise<Order[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userOrders = orders.filter((order) => order.userId === userId);
      resolve(userOrders);
    }, 500);
  });
}
