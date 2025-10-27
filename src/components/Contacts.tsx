import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

export default function Contacts() {
  return (
    <section id="contacts" className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Контакты</h2>
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <h3 className="text-2xl font-semibold mb-6">Свяжитесь с нами</h3>
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <Icon name="MapPin" size={24} className="text-accent mt-1" />
                <div>
                  <p className="font-medium">Адрес</p>
                  <p className="text-muted-foreground">г. Москва, ул. Примерная, д. 1</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="Phone" size={24} className="text-accent mt-1" />
                <div>
                  <p className="font-medium">Телефон</p>
                  <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="Mail" size={24} className="text-accent mt-1" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-muted-foreground">info@sneakers.ru</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Icon name="Clock" size={24} className="text-accent mt-1" />
                <div>
                  <p className="font-medium">Время работы</p>
                  <p className="text-muted-foreground">Пн-Вс: 10:00 - 21:00</p>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="outline" size="icon">
                <Icon name="Instagram" size={20} />
              </Button>
              <Button variant="outline" size="icon">
                <Icon name="Facebook" size={20} />
              </Button>
              <Button variant="outline" size="icon">
                <Icon name="Twitter" size={20} />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6">Напишите нам</h3>
            <form className="space-y-4">
              <div>
                <Input placeholder="Ваше имя" />
              </div>
              <div>
                <Input type="email" placeholder="Email" />
              </div>
              <div>
                <Textarea placeholder="Ваше сообщение" rows={5} />
              </div>
              <Button type="submit" className="w-full">
                Отправить
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
