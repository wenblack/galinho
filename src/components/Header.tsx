import { useState } from "react";
import {
  Search,
  ShoppingCart,
  User,
  Phone,
  MapPin,
  Heart,
  Menu,
  X,
} from "lucide-react";
import logo from "@/assets/galinho-logo.png";
import { useCart } from "@/contexts/CartContext";

const navItems = [
  "Ar Condicionado",
  "Compressores",
  "Peças e Acessórios",
  "Purificadores",
  "Ferramentas",
  "Ofertas",
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useCart();

  // Calculate total items in cart (sum of all clickCounts)
  const totalCartItems = cart.reduce((sum, item) => sum + item.clickCount, 0);

  return (
    <header className="w-full">
      {/* Top bar */}
      <div className="bg-secondary text-secondary-foreground text-xs py-1.5">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              (11) 4002-8922
            </span>
            <span className="hidden sm:flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              Nossas Lojas
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a href="#" className="hover:underline">
              Central de Atendimento
            </a>
            <a href="#" className="hover:underline hidden sm:inline">
              Meus Pedidos
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-primary text-primary-foreground py-3">
        <div className="container mx-auto px-4 flex items-center justify-between gap-3">
          {/* Mobile menu button */}
          <button
            className="md:hidden text-primary-foreground"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          {/* Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <img
              src={logo}
              alt="Galinho"
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full bg-primary-foreground"
            />
            <span className="text-xl sm:text-2xl font-bold tracking-tight hidden sm:block">
              GALINHO
            </span>
          </a>

          {/* Search - hidden on mobile, shown on sm+ */}
          <div className="hidden sm:flex flex-1 max-w-xl">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="O que você está procurando?"
                className="w-full py-2 px-4 pr-10 rounded-md text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="#"
              className="flex items-center gap-1 hover:opacity-80 transition-opacity"
            >
              <User className="w-5 h-5" />
              <span className="text-sm hidden md:block">Entrar</span>
            </a>
            <a
              href="#"
              className="relative hover:opacity-80 transition-opacity hidden sm:block"
            >
              <Heart className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="relative hover:opacity-80 transition-opacity"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 bg-accent text-accent-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {totalCartItems}
              </span>
            </a>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="sm:hidden container mx-auto px-4 mt-2">
          <div className="relative">
            <input
              type="text"
              placeholder="O que você está procurando?"
              className="w-full py-2 px-4 pr-10 rounded-md text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-primary/90 text-primary-foreground text-sm border-t border-primary-foreground/10">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-6 py-2">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="hover:opacity-80 transition-opacity font-medium"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {menuOpen && (
        <nav className="md:hidden bg-primary text-primary-foreground border-t border-primary-foreground/10 animate-in slide-in-from-top-2 duration-200">
          <ul className="container mx-auto px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <li key={item}>
                <a
                  href="#"
                  className="block py-2.5 px-3 rounded-md hover:bg-primary-foreground/10 transition-colors font-medium text-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
