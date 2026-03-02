import { Search, ShoppingCart, User, Phone, MapPin, Heart } from "lucide-react";
import logo from "@/assets/galinho-logo.png";

const Header = () => {
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
            <a href="#" className="hover:underline">Central de Atendimento</a>
            <a href="#" className="hover:underline hidden sm:inline">Meus Pedidos</a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-primary text-primary-foreground py-3">
        <div className="container mx-auto px-4 flex items-center justify-between gap-4">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 shrink-0">
            <img src={logo} alt="Galinho" className="h-10 w-10 rounded-full bg-primary-foreground" />
            <span className="text-2xl font-bold tracking-tight hidden sm:block">GALINHO</span>
          </a>

          {/* Search */}
          <div className="flex-1 max-w-xl">
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

          {/* Actions */}
          <div className="flex items-center gap-4">
            <a href="#" className="flex items-center gap-1 hover:opacity-80 transition-opacity">
              <User className="w-5 h-5" />
              <span className="text-sm hidden md:block">Entrar</span>
            </a>
            <a href="#" className="relative hover:opacity-80 transition-opacity">
              <Heart className="w-5 h-5" />
            </a>
            <a href="#" className="relative hover:opacity-80 transition-opacity">
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1.5 -right-1.5 bg-accent text-accent-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-primary/90 text-primary-foreground text-sm border-t border-primary-foreground/10">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-6 py-2 overflow-x-auto whitespace-nowrap">
            {["Ar Condicionado", "Compressores", "Peças e Acessórios", "Purificadores", "Ferramentas", "Ofertas"].map((item) => (
              <li key={item}>
                <a href="#" className="hover:opacity-80 transition-opacity font-medium">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
