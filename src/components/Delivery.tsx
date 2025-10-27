import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function Delivery() {
  return (
    <section id="delivery" className="py-20 px-4 bg-secondary">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Доставка</h2>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-white rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold">
                Способы доставки
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p className="mb-3">Мы предлагаем несколько вариантов доставки:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Курьерская доставка по Москве — 1-2 дня</li>
                  <li>Доставка в регионы — 3-5 дней</li>
                  <li>Самовывоз из пункта выдачи — бесплатно</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="bg-white rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold">
                Стоимость доставки
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p className="mb-3">Стоимость зависит от региона и способа доставки:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>По Москве в пределах МКАД — 300 ₽</li>
                  <li>За МКАД — 300 ₽ + 30 ₽/км</li>
                  <li>Регионы России — от 400 ₽</li>
                  <li>Бесплатная доставка при заказе от 10 000 ₽</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="bg-white rounded-lg px-6">
              <AccordionTrigger className="text-lg font-semibold">
                Возврат и обмен
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p>
                  Вы можете вернуть или обменять товар в течение 14 дней с момента получения. 
                  Товар должен быть в оригинальной упаковке, без следов носки. 
                  Возврат средств осуществляется в течение 5-10 рабочих дней.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
}
