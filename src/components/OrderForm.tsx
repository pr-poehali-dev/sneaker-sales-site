import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { CartItem } from '@/components/Cart';

interface OrderFormProps {
  items: CartItem[];
  totalAmount: number;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function OrderForm({ items, totalAmount, onSuccess, onCancel }: OrderFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phone || !address) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все поля',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const orderNumber = `ORD-${Date.now()}`;
      
      const orderData = {
        order_number: orderNumber,
        customer_name: name,
        phone: phone,
        address: address,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        total_amount: totalAmount,
        status: 'новый'
      };

      const response = await fetch('https://functions.poehali.dev/70394b2a-2435-4fdf-8854-f28f756da53d', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error('Ошибка при сохранении заказа');
      }

      const result = await response.json();
      console.log('Заказ сохранен:', result);

      toast({
        title: 'Заказ оформлен!',
        description: `Номер заказа: ${orderNumber}`,
      });

      onSuccess();
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось оформить заказ',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">Оформление заказа</h3>
      
      <div>
        <label className="block text-sm font-medium mb-2">Имя</label>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ваше имя"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Телефон</label>
        <Input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="+7 (___) ___-__-__"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Адрес доставки</label>
        <Textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Город, улица, дом, квартира"
          required
          rows={3}
        />
      </div>

      <div className="pt-4 border-t">
        <div className="flex justify-between text-lg font-semibold mb-4">
          <span>Итого:</span>
          <span>{totalAmount.toLocaleString('ru-RU')} ₽</span>
        </div>

        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
            className="flex-1"
          >
            Отмена
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? 'Оформление...' : 'Оформить заказ'}
          </Button>
        </div>
      </div>
    </form>
  );
}