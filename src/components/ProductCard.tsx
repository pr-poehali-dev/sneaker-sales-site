import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 animate-scale-in">
      <CardContent className="p-0">
        <div className="relative overflow-hidden bg-secondary aspect-square">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4">
            <span className="bg-white px-3 py-1 text-xs font-medium rounded-full">
              {product.category}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-3 p-6">
        <div className="w-full">
          <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
          <p className="text-2xl font-bold">{product.price.toLocaleString('ru-RU')} ₽</p>
        </div>
        <Button 
          className="w-full" 
          onClick={() => onAddToCart(product)}
        >
          <Icon name="ShoppingCart" size={18} className="mr-2" />
          В корзину
        </Button>
      </CardFooter>
    </Card>
  );
}
