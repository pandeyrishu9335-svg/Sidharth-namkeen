// Delivery option data — structured so real courier/logistics rates and
// serviceability (pincode) checks can be wired in from an API later.

export interface DeliveryOption {
  id: string;
  label: string;
  eta: string;
  price: number; // 0 = Free
  description: string;
}

export const deliveryOptions: DeliveryOption[] = [
  {
    id: "standard",
    label: "Standard Delivery",
    eta: "3–5 business days",
    price: 0,
    description: "Delivered to your doorstep via our regional courier network.",
  },
  {
    id: "express",
    label: "Express Delivery",
    eta: "1–2 business days",
    price: 79,
    description: "Priority dispatch for when you need your snacks sooner.",
  },
  {
    id: "pickup",
    label: "Store Pickup",
    eta: "Ready within 24 hours",
    price: 0,
    description: "Collect your order directly from our Siddharth Nagar unit.",
  },
];

export const FREE_DELIVERY_THRESHOLD = 499;
