import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useProducts } from "@/contexts/ProductContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LogOut, Plus, Search, Package, TrendingUp, Users, Eye, EyeOff } from "lucide-react";
import AdminProductForm from "@/components/AdminProductForm";
import AdminProductList from "@/components/AdminProductList";

const AdminDashboard = () => {
  const { logout } = useAuth();
  const { products } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterAvailability, setFilterAvailability] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);

  // Estatísticas
  const totalProducts = products.length;
  const availableProducts = products.filter(p => p.available).length;
  const unavailableProducts = totalProducts - availableProducts;
  const categories = [...new Set(products.map(p => p.category))];

  // Filtros
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    const matchesAvailability = filterAvailability === 'all' || 
                               (filterAvailability === 'available' && product.available) ||
                               (filterAvailability === 'unavailable' && !product.available);
    
    return matchesSearch && matchesCategory && matchesAvailability;
  });

  const handleAddProduct = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEditProduct = (productId: string) => {
    setEditingProduct(productId);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-white to-cream">
      {/* Header */}
      <div className="bg-background border-b border-border/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Painel Administrativo</h1>
              <p className="text-sm text-muted-foreground">Gerenciamento de produtos</p>
            </div>
            <Button
              onClick={logout}
              variant="outline"
              className="hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-border/50 shadow-elegant">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total de Produtos</p>
                  <p className="text-3xl font-bold text-foreground">{totalProducts}</p>
                </div>
                <Package className="w-8 h-8 text-gold" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-elegant">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Disponíveis</p>
                  <p className="text-3xl font-bold text-green-600">{availableProducts}</p>
                </div>
                <Eye className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-elegant">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Indisponíveis</p>
                  <p className="text-3xl font-bold text-red-500">{unavailableProducts}</p>
                </div>
                <EyeOff className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="bg-background border border-border/50">
            <TabsTrigger value="products">Gerenciar Produtos</TabsTrigger>
            <TabsTrigger value="add">Adicionar Produto</TabsTrigger>
          </TabsList>

          <TabsContent value="products" className="space-y-6">
            {/* Filtros */}
            <Card className="border-border/50 shadow-elegant">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5" />
                  Filtros
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Buscar por nome ou descrição
                    </label>
                    <Input
                      placeholder="Digite para buscar..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Categoria
                    </label>
                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Todas as categorias" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas as categorias</SelectItem>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Disponibilidade
                    </label>
                    <Select value={filterAvailability} onValueChange={setFilterAvailability}>
                      <SelectTrigger>
                        <SelectValue placeholder="Todos os status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos os status</SelectItem>
                        <SelectItem value="available">Disponível</SelectItem>
                        <SelectItem value="unavailable">Indisponível</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    {filteredProducts.length} produto(s) encontrado(s)
                  </p>
                  <Button onClick={handleAddProduct} className="bg-gold hover:bg-gold-dark text-background">
                    <Plus className="w-4 h-4 mr-2" />
                    Novo Produto
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Lista de Produtos */}
            <AdminProductList 
              products={filteredProducts}
              onEdit={handleEditProduct}
            />
          </TabsContent>

          <TabsContent value="add">
            <AdminProductForm 
              productId={editingProduct}
              onClose={handleCloseForm}
            />
          </TabsContent>
        </Tabs>

        {/* Modal de Formulário */}
        {showForm && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-background border border-border rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <AdminProductForm 
                productId={editingProduct}
                onClose={handleCloseForm}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;