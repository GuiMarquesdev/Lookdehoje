import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { useHero } from "@/contexts/HeroContext";
import { useEffect, useState } from "react";

const Hero = () => {
  const { mode, images } = useHero();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (mode === 'carousel' && images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }, 5000); // Troca a cada 5 segundos

      return () => clearInterval(interval);
    }
  }, [mode, images.length]);

  const currentImage = images[currentImageIndex] || images[0];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        {mode === 'carousel' && images.length > 1 ? (
          images.map((image, index) => (
            <img
              key={image.id}
              src={image.url}
              alt={image.alt}
              className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))
        ) : (
          <img
            src={currentImage?.url || '/lovable-uploads/4d8afebf-4451-456f-9224-6d0bb556cd5a.png'}
            alt={currentImage?.alt || 'Elegant fashion collection'}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="text-gold" size={24} />
            <span className="text-gold font-medium">Aluguel de Looks Exclusivos</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Vista-se com
            <span className="block bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
              Elegância
            </span>
            sem compromisso
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Descubra looks únicos e sofisticados para todas as ocasiões. 
            Alugue peças exclusivas e brilhe em cada momento especial.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild className="shadow-gold">
              <a href="#looks" className="flex items-center gap-2">
                Ver Coleção
                <ArrowRight size={18} />
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
              >
                Fale Conosco
              </a>
            </Button>
          </div>
          
          <div className="flex items-center gap-8 mt-12 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gold rounded-full" />
              <span>+500 Looks Disponíveis</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gold rounded-full" />
              <span>Entrega Rápida</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gold rounded-full" />
              <span>Qualidade Premium</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;