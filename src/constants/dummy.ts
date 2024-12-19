export interface Product {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  quantity: number; // Number of units added to the cart
  availableQuantity: number; // Total number of units available in stock
}

export const products: Product[] = [
  {
    id: "1",
    name: "Brown Leather Handbag",
    price: 85000,
    rating: 4.5,
    image: "https://via.placeholder.com/150",
    quantity: 1, // Default quantity in cart
    availableQuantity: 10, // Mock available quantity
  },
  {
    id: "2",
    name: "Pink Leather Handbag",
    price: 85000,
    rating: 4.5,
    image: "https://via.placeholder.com/150",
    quantity: 1, // Default quantity in cart
    availableQuantity: 5, // Mock available quantity
  },
  {
    id: "3",
    name: "Black Tote Bag",
    price: 120000,
    rating: 5.0,
    image: "https://via.placeholder.com/150",
    quantity: 1, // Default quantity in cart
    availableQuantity: 8, // Mock available quantity
  },
  {
    id: "4",
    name: "Green Satchel",
    price: 95000,
    rating: 4.0,
    image: "https://via.placeholder.com/150",
    quantity: 1, // Default quantity in cart
    availableQuantity: 12, // Mock available quantity
  },
  {
    id: "5",
    name: "Red Backpack",
    price: 65000,
    rating: 3.8,
    image: "https://via.placeholder.com/150",
    quantity: 1, // Default quantity in cart
    availableQuantity: 7, // Mock available quantity
  },
  {
    id: "6",
    name: "Blue Crossbody Bag",
    price: 70000,
    rating: 4.3,
    image: "https://via.placeholder.com/150",
    quantity: 1, // Default quantity in cart
    availableQuantity: 9, // Mock available quantity
  },
  {
    id: "7",
    name: "Tan Briefcase",
    price: 150000,
    rating: 4.8,
    image: "https://via.placeholder.com/150",
    quantity: 1, // Default quantity in cart
    availableQuantity: 6, // Mock available quantity
  },
  {
    id: "8",
    name: "White Clutch",
    price: 40000,
    rating: 4.2,
    image: "https://via.placeholder.com/150",
    quantity: 1, // Default quantity in cart
    availableQuantity: 11, // Mock available quantity
  },
  {
    id: "9",
    name: "Yellow Wallet",
    price: 30000,
    rating: 4.0,
    image: "https://via.placeholder.com/150",
    quantity: 1, // Default quantity in cart
    availableQuantity: 15, // Mock available quantity
  },
  {
    id: "10",
    name: "Purple Purse",
    price: 50000,
    rating: 4.5,
    image: "https://via.placeholder.com/150",
    quantity: 1, // Default quantity in cart
    availableQuantity: 4, // Mock available quantity
  },
  {
    id: "11",
    name: "Orange Duffel Bag",
    price: 100000,
    rating: 4.7,
    image: "https://via.placeholder.com/150",
    quantity: 1, // Default quantity in cart
    availableQuantity: 13, // Mock available quantity
  },
  {
    id: "12",
    name: "Gray Messenger Bag",
    price: 85000,
    rating: 4.6,
    image: "https://via.placeholder.com/150",
    quantity: 1, // Default quantity in cart
    availableQuantity: 10, // Mock available quantity
  },
];

export const productImages: string[] = [
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
  "https://via.placeholder.com/150",
];
