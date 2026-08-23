// Centralized business/contact information.
// Change values here and they will propagate across the entire site.

export const business = {
  brandName: "Siddharth Namkeen",
  manufacturer: "Maa Oba Prerna Mahila Laghu Udyog",
  tagline: "Taste with Trust, Empowered by Women.",
  address: {
    line1: "Sikari Bakhariya, Lotan Bazaar",
    line2: "Siddharth Nagar, Uttar Pradesh, India",
    full: "Sikari Bakhariya, Lotan Bazaar, Siddharth Nagar, Uttar Pradesh, India",
  },
  phones: ["9569551174", "7619895160"],
  email: "Maaobapmlu@gmail.com",
  gstin: "09AAYAM3284F1ZY",
  // Primary WhatsApp number used for enquiry links — change here to update sitewide.
  whatsappNumber: "919569551174",
};

export const buildWhatsAppLink = (message: string) => {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${business.whatsappNumber}?text=${encoded}`;
};
