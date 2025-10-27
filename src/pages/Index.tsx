import { useState } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Catalog from '@/components/Catalog';
import Cart, { CartItem } from '@/components/Cart';
import About from '@/components/About';
import Delivery from '@/components/Delivery';
import Contacts from '@/components/Contacts';
import Footer from '@/components/Footer';
import { Product } from '@/components/ProductCard';
import { useToast } from '@/hooks/use-toast';

const products: Product[] = [
  {
    id: 1,
    name: 'Air Classic White',
    price: 12990,
    image: 'https://cdn.poehali.dev/projects/fb086d0a-c0ad-4e7a-a8f9-9e5fbc3b60a7/files/7d80db45-8619-4c7e-b377-a007925b8a57.jpg',
    category: 'Классика'
  },
  {
    id: 2,
    name: 'Sport Runner Black',
    price: 15990,
    image: 'https://cdn.poehali.dev/projects/fb086d0a-c0ad-4e7a-a8f9-9e5fbc3b60a7/files/ee6dda58-8488-4e13-b831-5a8c14b03c96.jpg',
    category: 'Спорт'
  },
  {
    id: 3,
    name: 'Urban Style Pro',
    price: 18990,
    image: 'https://cdn.poehali.dev/projects/fb086d0a-c0ad-4e7a-a8f9-9e5fbc3b60a7/files/45d0a32e-42be-4a08-b671-c3044caee6f6.jpg',
    category: 'Лайфстайл'
  },
  {
    id: 4,
    name: 'Comfort Walk',
    price: 11990,
    image: 'https://cdn.poehali.dev/projects/fb086d0a-c0ad-4e7a-a8f9-9e5fbc3b60a7/files/7d80db45-8619-4c7e-b377-a007925b8a57.jpg',
    category: 'Повседневные'
  },
  {
    id: 5,
    name: 'Speed Racer',
    price: 16990,
    image: 'https://cdn.poehali.dev/projects/fb086d0a-c0ad-4e7a-a8f9-9e5fbc3b60a7/files/ee6dda58-8488-4e13-b831-5a8c14b03c96.jpg',
    category: 'Спорт'
  },
  {
    id: 6,
    name: 'Street Legend',
    price: 19990,
    image: 'https://cdn.poehali.dev/projects/fb086d0a-c0ad-4e7a-a8f9-9e5fbc3b60a7/files/45d0a32e-42be-4a08-b671-c3044caee6f6.jpg',
    category: 'Лайфстайл'
  }
];

export default function Index() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        toast({
          title: 'Количество обновлено',
          description: `${product.name} уже в корзине`,
        });
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      toast({
        title: 'Добавлено в корзину',
        description: product.name,
      });
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen">
      <Header cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
      <Hero />
      <Catalog products={products} onAddToCart={handleAddToCart} />
      <About />
      <Delivery />
      <Contacts />
      <Footer />
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={handleRemoveItem}
        onUpdateQuantity={handleUpdateQuantity}
      />
    </div>
  );
}
