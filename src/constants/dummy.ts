export interface Product {
  id: number;
  name: string;
  price: string;
  rating: number;
  image: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Brown Leather Handbag",
    price: "₦85,000",
    rating: 4.5,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Pink Leather Handbag",
    price: "₦85,000",
    rating: 4.5,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Black Tote Bag",
    price: "₦120,000",
    rating: 5.0,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Green Satchel",
    price: "₦95,000",
    rating: 4.0,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    name: "Red Backpack",
    price: "₦65,000",
    rating: 3.8,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 6,
    name: "Blue Crossbody Bag",
    price: "₦70,000",
    rating: 4.3,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 7,
    name: "Tan Briefcase",
    price: "₦150,000",
    rating: 4.8,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 8,
    name: "White Clutch",
    price: "₦40,000",
    rating: 4.2,
    image: "https://via.placeholder.com/150",
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
];
