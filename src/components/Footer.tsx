import { Facebook, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer-gradient text-primary-foreground">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Social */}
          <div className="text-center sm:text-left">
            <h3 className="font-bold text-sm uppercase mb-3">Redes Sociais</h3>
            <div className="flex gap-3 justify-center sm:justify-start">
              <a href="#" aria-label="Facebook" className="hover:opacity-80 transition-opacity">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" aria-label="Instagram" className="hover:opacity-80 transition-opacity">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" aria-label="YouTube" className="hover:opacity-80 transition-opacity">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="text-center sm:text-left">
            <h3 className="font-bold text-sm uppercase mb-3">Institucional</h3>
            <ul className="space-y-1.5 text-sm opacity-80">
              <li><a href="/nossa-historia" className="hover:underline">Nossa História</a></li>
              <li><a href="/politica-de-privacidade" className="hover:underline">Política de Privacidade</a></li>
              <li><a href="/contato" className="hover:underline">Contato</a></li>
              <li><a href="/faq" className="hover:underline">FAQ</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="text-center sm:text-left">
            <h3 className="font-bold text-sm uppercase mb-3">Atendimento</h3>
            <ul className="space-y-1.5 text-sm opacity-80">
              <li>Seg a Sex: 8h às 18h</li>
              <li>(11) 4002-8922</li>
              <li>contato@galinho.com.br</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-6 sm:mt-8 pt-4 text-center text-xs opacity-60">
          © 2026 Galinho - Todos os direitos reservados
        </div>
      </div>
    </footer>
  );
};

export default Footer;
