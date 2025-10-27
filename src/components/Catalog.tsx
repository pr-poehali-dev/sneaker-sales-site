import ProductCard, { Product } from './ProductCard';

interface CatalogProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export default function Catalog({ products, onAddToCart }: CatalogProps) {
  return (
    <section id="catalog" className="py-20 px-4 bg-secondary">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Каталог</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
