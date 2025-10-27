import Icon from '@/components/ui/icon';

export default function About() {
  const features = [
    {
      icon: 'Award',
      title: 'Премиум качество',
      description: 'Только оригинальная продукция от проверенных брендов'
    },
    {
      icon: 'Truck',
      title: 'Быстрая доставка',
      description: 'Доставим ваш заказ в течение 1-3 дней'
    },
    {
      icon: 'Shield',
      title: 'Гарантия',
      description: 'Официальная гарантия на всю продукцию'
    }
  ];

  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">О нас</h2>
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Мы — команда энтузиастов, влюблённых в кроссовки. Наша миссия — помочь каждому найти идеальную пару, которая станет отражением вашего стиля и характера. Мы тщательно отбираем только лучшие модели от мировых брендов.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="text-center p-6 rounded-lg hover:bg-secondary transition-colors animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent text-accent-foreground mb-4">
                <Icon name={feature.icon as any} size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
