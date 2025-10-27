import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface HeaderProps {
  cartCount: number;
  onCartClick: () => void;
}

export default function Header({ cartCount, onCartClick }: HeaderProps) {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const NavLinks = () => (
    <>
      <button 
        onClick={() => scrollToSection('home')} 
        className={`transition-colors hover:text-accent ${activeSection === 'home' ? 'text-accent' : ''}`}
      >
        Главная
      </button>
      <button 
        onClick={() => scrollToSection('catalog')} 
        className={`transition-colors hover:text-accent ${activeSection === 'catalog' ? 'text-accent' : ''}`}
      >
        Каталог
      </button>
      <button 
        onClick={() => scrollToSection('about')} 
        className={`transition-colors hover:text-accent ${activeSection === 'about' ? 'text-accent' : ''}`}
      >
        О нас
      </button>
      <button 
        onClick={() => scrollToSection('delivery')} 
        className={`transition-colors hover:text-accent ${activeSection === 'delivery' ? 'text-accent' : ''}`}
      >
        Доставка
      </button>
      <button 
        onClick={() => scrollToSection('contacts')} 
        className={`transition-colors hover:text-accent ${activeSection === 'contacts' ? 'text-accent' : ''}`}
      >
        Контакты
      </button>
    </>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">SNEAKERS</h1>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onCartClick} className="relative">
            <Icon name="ShoppingCart" size={20} />
            {cartCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {cartCount}
              </Badge>
            )}
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Icon name="Menu" size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Меню</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8 text-lg">
                <NavLinks />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
