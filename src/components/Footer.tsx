import { Instagram, Phone, Mail, Heart } from "lucide-react";
const Footer = () => {
  return <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <div>
              <img
                src="/lovable-uploads/4af0f4b1-bae5-43b5-ab9b-8b9723265bff.png"
                alt="Look de Hoje Outlet Brechó - logo"
                className="h-20 w-auto mb-3 select-none"
                loading="lazy"
              />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent mb-2">
                LookdeHoje
              </h3>
              <p className="text-background/70 leading-relaxed">
                Aluguel de looks exclusivos para ocasiões especiais. 
                Vista-se com elegância sem compromisso.
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-gold hover:text-background transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-gold hover:text-background transition-colors">
                <Phone size={20} />
              </a>
              <a href="mailto:contato@lookrental.com.br" className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-gold hover:text-background transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-background">Links Rápidos</h4>
            <nav className="space-y-3">
              <a href="#home" className="block text-background/70 hover:text-gold transition-colors">
                Início
              </a>
              <a href="#looks" className="block text-background/70 hover:text-gold transition-colors">
                Nossa Coleção
              </a>
              <a href="#como-funciona" className="block text-background/70 hover:text-gold transition-colors">
                Como Funciona
              </a>
              <a href="#contato" className="block text-background/70 hover:text-gold transition-colors">
                Contato
              </a>
            </nav>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-background">Contato</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-gold" />
                <span className="text-background/70">(11) 99999-9999</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-gold" />
                <span className="text-background/70">contato@lookrental.com.br</span>
              </div>
              <div className="flex items-center gap-3">
                <Instagram size={18} className="text-gold" />
                <span className="text-background/70">@looksdehojebrecho</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/70 text-sm">
              © 2025 LookdeHoje. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4">
              <p className="text-background/70 text-sm flex items-center gap-1">
                Feito com <Heart size={14} className="text-gold" /> para mulheres que amam moda
              </p>
              <a 
                href="/admin-login" 
                className="text-background/30 hover:text-background/50 text-xs transition-colors"
              >
                Admin
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;