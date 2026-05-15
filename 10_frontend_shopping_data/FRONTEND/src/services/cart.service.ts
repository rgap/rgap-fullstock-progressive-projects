import { Cart, type CartItem } from "@/models/cart.model";
import { products } from "@/services/product.service";

export function calculateTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

const blankCart: Cart = {
  id: 0,
  items: [],
  totals: {
    itemCount: 0,
    grandTotal: 0,
  },
  createdAt: "",
  updatedAt: "",
};

function getSavedCart(): Cart | null {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : null;
}

function saveCart(cart: Cart): void {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function getCart(): Promise<Cart> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const savedCart = getSavedCart();
      if (!savedCart) {
        saveCart(blankCart);
        resolve(blankCart);
        return;
      }
      resolve(savedCart);
    }, 350);
  });
}

export function updateCartItem(
  productId: number,
  quantity: number
): Promise<Cart> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const cart = getSavedCart() || blankCart;

      const item = cart.items.find((item) => item.productId === productId);
      if (item) {
        item.quantity = quantity;
        item.lineTotal = item.price * quantity;
      } else {
        const product = products.find((p) => p.id === productId);
        if (product) {
          cart.items.push({
            productId: product.id,
            title: product.title,
            imgSrc: product.imgSrc,
            quantity: quantity,
            price: product.price,
            lineTotal: product.price * quantity,
          });
        }
      }
      cart.totals.itemCount = cart.items.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      cart.totals.grandTotal = calculateTotal(cart.items);

      saveCart(cart);
      resolve(cart);
    }, 350);
  });
}

export function removeCartItem(productId: number): Cart {
  const cart = getSavedCart() || blankCart;
  cart.items = cart.items.filter((item) => item.productId !== productId);
  cart.totals.itemCount = cart.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  cart.totals.grandTotal = calculateTotal(cart.items);
  saveCart(cart);
  return cart;
}

export function clearCart(): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      localStorage.removeItem("cart");
      resolve();
    }, 350);
  });
}
