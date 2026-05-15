export interface ShippingInfo {
  firstName: string;
  lastName: string;
  company?: string;
  address: string;
  city: string;
  country: string;
  state: string;
  postalCode: string;
  phone: string;
}

export interface Order {
  id: number;
  userId: number | null;
  email: string;
  details: ShippingInfo;
  status: "pending" | "shipped" | "delivered" | "cancelled";
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface CheckoutFormData extends ShippingInfo {
  email: string;
}
