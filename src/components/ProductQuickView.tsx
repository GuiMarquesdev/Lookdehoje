import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ShoppingBag } from "lucide-react";

interface ProductQuickViewProps {
  open: boolean;
  product: {
    id: string;
    name: string;
    category: string;
    price: string;
    image: string;
    description: string;
    size?: string;
    available?: boolean;
  } | null;
  onClose: () => void;
}

const ProductQuickView = ({ open, product, onClose }: ProductQuickViewProps) => {
  if (!product) return null;

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
          <div>
            <img
              src={product.image}
              alt={`Foto em destaque de ${product.name}`}
              className="w-full h-auto max-h-[70vh] object-cover rounded-md"
              loading="eager"
              decoding="async"
            />
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
