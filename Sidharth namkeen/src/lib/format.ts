// Small shared formatting helpers used across cart/checkout/product UI.

export const formatINR = (amount: number): string => {
  if (amount <= 0) return "Free";
  return `₹${amount.toLocaleString("en-IN")}`;
};

export const generateOrderRef = (): string => {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const rand = Math.floor(Math.random() * 900 + 100);
  return `SN-${stamp}${rand}`;
};
