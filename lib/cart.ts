export interface CardItem {
  id: number;
  quantity: number;
  product: {
    id: number;
    title: string;
    price: number;
  };
}