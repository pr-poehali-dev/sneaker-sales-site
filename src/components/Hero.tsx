import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Hero() {
  const scrollToCatalog = () => {
    const element = document.getElementById('catalog');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="pt-32 pb-20 px-4">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Стиль начинается<br />с правильной обуви
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Премиальные кроссовки для тех, кто ценит качество, комфорт и уникальный дизайн
          </p>
          <Button size="lg" className="text-lg px-8 py-6" onClick={scrollToCatalog}>
            Смотреть каталог
            <Icon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
}
