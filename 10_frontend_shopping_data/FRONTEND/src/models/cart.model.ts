export interface CartItem {
  productId: number;
  title: string;
  imgSrc: string;
  quantity: number;
  price: number;
  lineTotal: number;
}

export interface Cart {
  id: number;
  items: CartItem[];
  totals: {
    itemCount: number;
    grandTotal: number;
  };
  createdAt: string;
  updatedAt: string;
}
