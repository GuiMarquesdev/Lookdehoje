import { useState } from "react";
import { Menu, X, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigation = [{
    name: "Home",
    href: "#home"
  }, {
    name: "Looks",
    href: "#looks"
  }, {
    name: "Como Funciona",
    href: "#como-funciona"
  }, {
    name: "Contato",
    href: "#contato"
  }];
  return <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/lovable-uploads/e0a369ea-d985-4699-acaa-3e6f4bab85e4.png"
              alt="Logo Look de Hoje Outlet Brechó"
              className="h-8 w-auto md:h-10 mr-3"
              loading="eager"
              decoding="async"
            />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">LookdeHoje</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map(item => <a key={item.name} href={item.href} className="text-foreground hover:text-gold transition-colors font-medium">
                {item.name}
              </a>)}
          </nav>

          {/* Contact Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <a href="https://www.instagram.com/looksdehojebrecho" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <Instagram size={16} />
                Instagram
              </a>
            </Button>
            <Button size="sm" asChild>
              <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map(item => <a key={item.name} href={item.href} className="block px-3 py-2 text-foreground hover:text-gold transition-colors" onClick={() => setIsMenuOpen(false)}>
                  {item.name}
                </a>)}
              <div className="flex flex-col gap-2 mt-4 px-3">
                <Button variant="outline" size="sm" asChild>
                  <a href="https://www.instagram.com/looksdehojebrecho" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 justify-center">
                    <Instagram size={16} />
                    Instagram
                  </a>
                </Button>
                <Button size="sm" asChild>
                  <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>}
      </div>
    </header>;
};
export default Header;