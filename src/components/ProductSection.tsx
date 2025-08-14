import ProductCard from "./ProductCard";
import ProductQuickView from "./ProductQuickView";
import { Button } from "@/components/ui/button";
import { Filter, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { useProducts } from "@/contexts/ProductContext";
import dress1 from "@/assets/dress-1.jpg";
import suit1 from "@/assets/suit-1.jpg";
import casual1 from "@/assets/casual-1.jpg";

const ProductSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [visibleCount, setVisibleCount] = useState(6);
  const { products: allProducts } = useProducts();
  
  type DisplayProduct = {
    id: string;
    name: string;
    category: string;
    price: string;
    image: string;
    additionalImages?: string[];
    description: string;
    size?: string;
    available?: boolean;
  };

  const [selectedProduct, setSelectedProduct] = useState<DisplayProduct | null>(null);
  
  // Filtrar apenas produtos disponíveis para exibição pública
  const availableProducts = allProducts.filter(product => product.available);
  
  // Extrair categorias únicas dos produtos disponíveis
  const categories = ["Todos", ...new Set(availableProducts.map(product => product.category))];
  
  // Produtos de fallback caso não haja produtos do admin
  const fallbackProducts = [
    {
      id: "1",
      name: "Vestido Elegante Preto",
      category: "Festa",
      price: "R$ 89/dia",
      image: dress1,
      description: "Vestido sofisticado perfeito para eventos noturnos e ocasiões especiais."
    },
    {
      id: "2",
      name: "Conjunto Executivo",
      category: "Trabalho",
      price: "R$ 79/dia",
      image: suit1,
      description: "Look profissional completo com blazer e calça para reuniões importantes."
    },
    {
      id: "3",
      name: "Look Casual Chic",
      category: "Casual",
      price: "R$ 59/dia",
      image: casual1,
      description: "Combinação elegante e confortável para o dia a dia com estilo."
    },
    {
      id: "4",
      name: "Vestido Festa Premium",
      category: "Festa",
      price: "R$ 129/dia",
      image: dress1,
      description: "Peça exclusiva para eventos de gala e celebrações especiais."
    },
    {
      id: "5",
      name: "Conjunto Social",
      category: "Trabalho",
      price: "R$ 69/dia",
      image: suit1,
      description: "Look corporativo moderno e sofisticado para apresentações."
    },
    {
      id: "6",
      name: "Outfit Descontraído",
      category: "Casual",
      price: "R$ 49/dia",
      image: casual1,
      description: "Visual casual elegante para encontros e passeios urbanos."
    }
  ];
  
  // Usar produtos do admin se disponíveis, senão usar fallback
  const productsToShow = availableProducts.length > 0 ? availableProducts : fallbackProducts;
  
  // Filtrar produtos por categoria
  const filteredProducts = selectedCategory === "Todos" 
    ? productsToShow 
    : productsToShow.filter(product => product.category === selectedCategory);
  // Limitar exibição inicial a 6 produtos
  const displayedProducts = filteredProducts.slice(0, visibleCount);

  return (
    <section id="looks" className="py-20 bg-warm-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nossa <span className="text-gold">Coleção</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Descubra looks únicos e sofisticados para cada ocasião especial da sua vida
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div className="flex items-center gap-2">
            <Filter size={20} className="text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Filtrar por categoria:</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => { setSelectedCategory(category); setVisibleCount(6); }}
                className={selectedCategory === category ? "shadow-gold" : ""}
              >
                {category}
              </Button>
            ))}
          </div>

          <Button variant="outline" size="sm" className="gap-2">
            <SlidersHorizontal size={16} />
            Mais Filtros
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
{displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onView={() => setSelectedProduct(product)}
            />
          ))}
        </div>

        {/* Quick View Modal */}
        <ProductQuickView
          open={!!selectedProduct}
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />

        {/* Load More */}
        {filteredProducts.length > visibleCount && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="hover:bg-gold hover:text-background hover:border-gold"
              onClick={() => setVisibleCount(filteredProducts.length)}
            >
              Ver Mais Looks
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductSection;