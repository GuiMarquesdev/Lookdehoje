import { useState, useEffect } from "react";
import { useProducts, type Product } from "@/contexts/ProductContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { X, Upload, Package } from "lucide-react";

interface AdminProductFormProps {
  productId?: string | null;
  onClose: () => void;
}

const categories = [
  'Vestidos',
  'Ternos',
  'Casual',
  'Festa',
  'Executivo',
  'Cerimônia',
  'Esportivo',
  'Outros'
];

const sizes = ['PP', 'P', 'M', 'G', 'GG', 'XGG'];

const AdminProductForm = ({ productId, onClose }: AdminProductFormProps) => {
  const { addProduct, updateProduct, getProduct } = useProducts();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    size: '',
    image: '',
    available: true,
    measurements: {
      bust: '',
      waist: '',
      hips: '',
      length: '',
      shoulder: '',
      sleeve: '',
      notes: '',
    },
  });

  useEffect(() => {
    if (productId) {
      const product = getProduct(productId);
      if (product) {
        setFormData({
          name: product.name,
          description: product.description,
          category: product.category,
          price: product.price,
          size: product.size,
          image: product.image,
          available: product.available,
          measurements: {
            bust: product.measurements?.bust ?? '',
            waist: product.measurements?.waist ?? '',
            hips: product.measurements?.hips ?? '',
            length: product.measurements?.length ?? '',
            shoulder: product.measurements?.shoulder ?? '',
            sleeve: product.measurements?.sleeve ?? '',
            notes: product.measurements?.notes ?? '',
          },
        });
        setIsEditing(true);
      }
    }
  }, [productId, getProduct]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.category || !formData.price.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha nome, categoria e preço.",
        variant: "destructive",
      });
      return;
    }

    try {
      if (isEditing && productId) {
        updateProduct(productId, formData);
        toast({
          title: "Produto atualizado",
          description: "As alterações foram salvas com sucesso!",
        });
      } else {
        addProduct(formData);
        toast({
          title: "Produto adicionado",
          description: "O novo produto foi cadastrado com sucesso!",
        });
      }

      // Reset form
      setFormData({
        name: '',
        description: '',
        category: '',
        price: '',
        size: '',
        image: '',
        available: true,
        measurements: {
          bust: '', waist: '', hips: '', length: '', shoulder: '', sleeve: '', notes: ''
        }
      });

      onClose();
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao salvar o produto.",
        variant: "destructive",
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Simular upload da imagem - em um caso real, você faria upload para um servidor
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          image: event.target?.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="border-border/50 shadow-elegant">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            {isEditing ? 'Editar Produto' : 'Adicionar Novo Produto'}
          </CardTitle>
          <CardDescription>
            {isEditing ? 'Atualize as informações do produto' : 'Preencha os dados do novo produto'}
          </CardDescription>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nome */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Nome do Produto *
              </label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ex: Vestido Elegante Preto"
                required
              />
            </div>

            {/* Categoria */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Categoria *
              </label>
              <Select 
                value={formData.category} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Preço */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Preço *
              </label>
              <Input
                value={formData.price}
                onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                placeholder="Ex: R$ 120/dia"
                required
              />
            </div>

            {/* Tamanho */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Tamanho
              </label>
              <Select 
                value={formData.size} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, size: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um tamanho" />
                </SelectTrigger>
                <SelectContent>
                  {sizes.map(size => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Descrição */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Descrição
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Descreva os detalhes do produto..."
              rows={3}
            />
          </div>
          {/* Medidas (opcional) */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Medidas (opcional)
            </label>
            <p className="text-xs text-muted-foreground">
              Informe as medidas exatas para melhor ajuste (ex: 92 cm).
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Busto</span>
                <Input
                  value={formData.measurements?.bust || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      measurements: { ...prev.measurements, bust: e.target.value },
                    }))
                  }
                  placeholder="Ex: 92 cm"
                />
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Cintura</span>
                <Input
                  value={formData.measurements?.waist || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      measurements: { ...prev.measurements, waist: e.target.value },
                    }))
                  }
                  placeholder="Ex: 70 cm"
                />
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Quadril</span>
                <Input
                  value={formData.measurements?.hips || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      measurements: { ...prev.measurements, hips: e.target.value },
                    }))
                  }
                  placeholder="Ex: 98 cm"
                />
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Comprimento</span>
                <Input
                  value={formData.measurements?.length || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      measurements: { ...prev.measurements, length: e.target.value },
                    }))
                  }
                  placeholder="Ex: 140 cm"
                />
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Ombro</span>
                <Input
                  value={formData.measurements?.shoulder || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      measurements: { ...prev.measurements, shoulder: e.target.value },
                    }))
                  }
                  placeholder="Ex: 38 cm"
                />
              </div>
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground">Manga</span>
                <Input
                  value={formData.measurements?.sleeve || ''}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      measurements: { ...prev.measurements, sleeve: e.target.value },
                    }))
                  }
                  placeholder="Ex: 60 cm"
                />
              </div>
            </div>
            <div className="space-y-1">
              <span className="text-xs text-muted-foreground">Observações</span>
              <Textarea
                value={formData.measurements?.notes || ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    measurements: { ...prev.measurements, notes: e.target.value },
                  }))
                }
                placeholder="Ex: tecido com leve elasticidade..."
                rows={2}
              />
            </div>
          </div>

          {/* Upload de Imagem */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Imagem do Produto
            </label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
              {formData.image ? (
                <div className="space-y-4">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="mx-auto max-h-40 rounded-lg object-cover"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                  >
                    Remover Imagem
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="mx-auto w-8 h-8 text-muted-foreground" />
                  <div>
                    <label className="cursor-pointer">
                      <span className="bg-gold hover:bg-gold-dark text-background px-4 py-2 rounded-md text-sm font-medium transition-colors">
                        Escolher Arquivo
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    <p className="text-xs text-muted-foreground mt-2">
                      PNG, JPG até 5MB
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Disponibilidade */}
          <div className="flex items-center justify-between p-4 border border-border rounded-lg">
            <div>
              <label className="text-sm font-medium text-foreground">
                Produto Disponível
              </label>
              <p className="text-xs text-muted-foreground">
                Marque se o produto está disponível para aluguel
              </p>
            </div>
            <Switch
              checked={formData.available}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, available: checked }))}
            />
          </div>

          {/* Botões */}
          <div className="flex gap-4 pt-6 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-gold hover:bg-gold-dark text-background"
            >
              {isEditing ? 'Atualizar Produto' : 'Adicionar Produto'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminProductForm;