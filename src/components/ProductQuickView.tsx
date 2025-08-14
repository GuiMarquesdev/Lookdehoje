import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

interface ProductQuickViewProps {
  open: boolean;
  product: {
    id: string;
    name: string;
    category: string;
    price: string;
    image: string;
    additionalImages?: string[];
    description: string;
    size?: string;
    available?: boolean;
  } | null;
  onClose: () => void;
}

const ProductQuickView = ({ open, product, onClose }: ProductQuickViewProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  if (!product) return null;

  const allImages = [product.image, ...(product.additionalImages || [])];
  const hasMultipleImages = allImages.length > 1;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const handleWhatsApp = () => {
    const message = `Olá! Tenho interesse no look "${product.name}" - ${product.category}. Gostaria de mais informações sobre o aluguel.`;
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
      <DialogContent className="sm:max-w-3xl border-border/50 shadow-elegant">
        <DialogHeader>
          <DialogTitle className="text-foreground">{product.name}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {product.category} {product.size ? `• Tamanho ${product.size}` : ""}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <img
              src={allImages[currentImageIndex]}
              alt={`Foto ${currentImageIndex + 1} de ${product.name}`}
              className="w-full h-auto max-h-[70vh] object-cover rounded-md"
              loading="eager"
              decoding="async"
            />
            
            {hasMultipleImages && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90 backdrop-blur-sm rounded-full p-2 transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90 backdrop-blur-sm rounded-full p-2 transition-all"
                >
                  <ChevronRight size={20} />
                </button>
                
                {/* Indicadores de imagem */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {allImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        currentImageIndex === index 
                          ? 'bg-gold' 
                          : 'bg-background/60 hover:bg-background/80'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
            
            {/* Thumbnails */}
            {hasMultipleImages && (
              <div className="mt-4 flex gap-2 overflow-x-auto">
                {allImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all ${
                      currentImageIndex === index 
                        ? 'border-gold' 
                        : 'border-border hover:border-gold/50'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Descrição</p>
              <p className="text-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="flex items-center justify-between py-3 border-t border-border">
              <span className="text-2xl font-semibold text-gold">{product.price}</span>
              {typeof product.available === "boolean" && (
                <span className={`text-sm font-medium ${product.available ? "text-gold" : "text-destructive"}`}>
                  {product.available ? "Disponível" : "Indisponível"}
                </span>
              )}
            </div>

            <div className="flex gap-3 mt-auto">
              <Button onClick={handleWhatsApp} className="bg-gold hover:bg-gold-dark text-background flex-1">
                <ShoppingBag size={16} className="mr-2" />
                Falar no WhatsApp
              </Button>
              <Button variant="outline" onClick={onClose} className="flex-1">
                Fechar
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductQuickView;
