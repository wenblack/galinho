import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  Phone,
  MapPin,
  Heart,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import logo from "@/assets/galinho-logo.png";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Nossa História", href: "/nossa-historia" },
  { label: "Contato", href: "/contato" },
  { label: "Produtos", href: "/produtos" },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { cart } = useCart();
  const { user, isAuthenticated, logout } = useAuth();

  // Calculate total items in cart (sum of all clickCounts)
  const totalCartItems = cart.reduce((sum, item) => sum + item.clickCount, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

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
      <div className="bg-background text-foreground py-3 border-b border-border">
        <div className="container mx-auto px-4 flex items-center justify-between gap-3">
          {/* Mobile menu button */}
          <button
            className="md:hidden text-foreground"
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
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-full"
            />
            <div className="hidden sm:block">
              <span className="text-xl sm:text-2xl font-bold tracking-tight block leading-tight">
                GALINHO
              </span>
              <span className="text-[10px] opacity-70 tracking-wider block -mt-0.5">
                REFRIGERAÇÃO E AR CONDICIONADO
              </span>
            </div>
          </a>

          {/* Search - hidden on mobile, shown on sm+ */}
          <form
            onSubmit={handleSearch}
            className="hidden sm:flex flex-1 max-w-xl"
          >
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="O que você está procurando?"
                className="w-full py-2 px-4 pr-10 rounded-md text-foreground text-sm bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                aria-label="Buscar"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 hover:opacity-80 transition-opacity focus:outline-none">
                    <User className="w-5 h-5" />
                    <span className="text-sm hidden md:block">
                      {user?.name.split(" ")[0]}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <a href="/account" className="cursor-pointer">
                      <User className="w-4 h-4 mr-2" />
                      Minha Conta
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 hover:opacity-80 transition-opacity focus:outline-none">
                    <User className="w-5 h-5" />
                    <span className="text-sm hidden md:block">Entrar</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <a href="/signin" className="cursor-pointer">
                      <User className="w-4 h-4 mr-2" />
                      Entrar
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a href="/signup" className="cursor-pointer">
                      <User className="w-4 h-4 mr-2" />
                      Criar Conta
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <a
              href="/wishlist"
              aria-label="Wishlist"
              className="relative hover:opacity-80 transition-opacity hidden sm:block"
            >
              <Heart className="w-5 h-5" />
            </a>
            <a
              href="/cart"
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
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="O que você está procurando?"
              className="w-full py-2 px-4 pr-10 rounded-md text-foreground text-sm bg-muted border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              aria-label="Buscar"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-primary text-primary-foreground text-sm">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-6 py-2">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="hover:opacity-80 transition-opacity font-medium"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Navigation Drawer */}
      {menuOpen && (
        <nav className="md:hidden bg-background text-foreground border-t border-border animate-in slide-in-from-top-2 duration-200">
          <ul className="container mx-auto px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="block py-2.5 px-3 rounded-md hover:bg-muted transition-colors font-medium text-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}

            {/* Account options in mobile menu */}
            <li className="pt-2 mt-2 border-t border-border">
              {isAuthenticated ? (
                <>
                  <a
                    href="/account"
                    className="flex items-center gap-2 py-2.5 px-3 rounded-md hover:bg-muted transition-colors font-medium text-sm"
                    onClick={() => setMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    Minha Conta
                  </a>
                  <button
                    onClick={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    className="flex items-center gap-2 w-full py-2.5 px-3 rounded-md hover:bg-primary-foreground/10 transition-colors font-medium text-sm text-left"
                  >
                    <LogOut className="w-4 h-4" />
                    Sair
                  </button>
                </>
              ) : (
                <>
                  <a
                    href="/signin"
                    className="flex items-center gap-2 py-2.5 px-3 rounded-md hover:bg-primary-foreground/10 transition-colors font-medium text-sm"
                    onClick={() => setMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    Entrar
                  </a>
                  <a
                    href="/signup"
                    className="flex items-center gap-2 py-2.5 px-3 rounded-md hover:bg-primary-foreground/10 transition-colors font-medium text-sm"
                    onClick={() => setMenuOpen(false)}
                  >
                    <User className="w-4 h-4" />
                    Criar Conta
                  </a>
                </>
              )}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
