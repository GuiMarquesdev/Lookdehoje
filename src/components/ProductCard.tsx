import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
}

const ProductCard = ({ id, name, category, price, image, description }: ProductCardProps) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleWhatsApp = () => {
    const message = `Olá! Tenho interesse no look "${name}" - ${category}. Gostaria de mais informações sobre o aluguel.`;
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Card className="group overflow-hidden hover:shadow-elegant transition-all duration-300 border-border/50 hover:border-gold/30">
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-all duration-200 ${
            isFavorite 
              ? 'bg-gold/20 text-gold' 
              : 'bg-background/20 text-foreground hover:bg-gold/20 hover:text-gold'
          }`}
        >
          <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-background/90 backdrop-blur-sm text-xs font-medium text-foreground rounded-full border border-border/50">
            {category}
          </span>
        </div>

        {/* Quick Action */}
        <div className="absolute bottom-4 left-4 right-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button 
            onClick={handleWhatsApp}
            className="w-full bg-background/90 text-foreground hover:bg-gold hover:text-background backdrop-blur-sm border border-border/50"
            size="sm"
          >
            <ShoppingBag size={16} className="mr-2" />
            Alugar Agora
          </Button>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-gold transition-colors">
              {name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description}
            </p>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gold">
              {price}
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleWhatsApp}
              className="hover:bg-gold hover:text-background hover:border-gold"
            >
              Ver Detalhes
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;