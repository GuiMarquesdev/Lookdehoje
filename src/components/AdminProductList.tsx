import { useProducts, type Product } from "@/contexts/ProductContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Edit, Trash2, Eye, EyeOff, Calendar, Package } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface AdminProductListProps {
  products: Product[];
  onEdit: (productId: string) => void;
}

const AdminProductList = ({ products, onEdit }: AdminProductListProps) => {
  const { deleteProduct, toggleAvailability } = useProducts();
  const { toast } = useToast();

  const handleDelete = (productId: string, productName: string) => {
    deleteProduct(productId);
    toast({
      title: "Produto excluído",
      description: `"${productName}" foi removido com sucesso.`,
    });
  };

  const handleToggleAvailability = (productId: string, currentStatus: boolean, productName: string) => {
    toggleAvailability(productId);
    toast({
      title: "Status atualizado",
      description: `"${productName}" agora está ${!currentStatus ? 'disponível' : 'indisponível'}.`,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  if (products.length === 0) {
    return (
      <Card className="border-border/50 shadow-elegant">
        <CardContent className="p-12 text-center">
          <Package className="mx-auto w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">
            Nenhum produto encontrado
          </h3>
          <p className="text-muted-foreground">
            Tente ajustar os filtros ou adicione novos produtos.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <Card key={product.id} className="border-border/50 shadow-elegant hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Imagem */}
              <div className="flex-shrink-0">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-32 h-32 object-cover rounded-lg border border-border"
                  />
                ) : (
                  <div className="w-32 h-32 bg-muted rounded-lg flex items-center justify-center border border-border">
                    <Package className="w-8 h-8 text-muted-foreground" />
                  </div>
                )}
              </div>

              {/* Informações */}
              <div className="flex-1 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-lg font-semibold text-foreground">
                        {product.name}
                      </h3>
                      <Badge
                        variant={product.available ? "default" : "secondary"}
                        className={product.available 
                          ? "bg-green-100 text-green-800 hover:bg-green-100" 
                          : "bg-red-100 text-red-800 hover:bg-red-100"
                        }
                      >
                        {product.available ? 'Disponível' : 'Indisponível'}
                      </Badge>
                      <Badge variant="outline">{product.category}</Badge>
                      {product.size && (
                        <Badge variant="outline">Tamanho {product.size}</Badge>
                      )}
                    </div>
                    
                    <div className="text-2xl font-bold text-gold">
                      {product.price}
                    </div>

                    {product.description && (
                      <p className="text-muted-foreground text-sm line-clamp-2">
                        {product.description}
                      </p>
                    )}

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Criado: {formatDate(product.createdAt)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Atualizado: {formatDate(product.updatedAt)}
                      </div>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex gap-2 flex-wrap">
                    <Button
                      onClick={() => handleToggleAvailability(product.id, product.available, product.name)}
                      variant="outline"
                      size="sm"
                      className={product.available 
                        ? "hover:bg-red-50 hover:text-red-600 hover:border-red-200" 
                        : "hover:bg-green-50 hover:text-green-600 hover:border-green-200"
                      }
                    >
                      {product.available ? (
                        <>
                          <EyeOff className="w-4 h-4 mr-1" />
                          Marcar Indisponível
                        </>
                      ) : (
                        <>
                          <Eye className="w-4 h-4 mr-1" />
                          Marcar Disponível
                        </>
                      )}
                    </Button>

                    <Button
                      onClick={() => onEdit(product.id)}
                      variant="outline"
                      size="sm"
                      className="hover:bg-gold hover:text-background hover:border-gold"
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Editar
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Excluir
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                          <AlertDialogDescription>
                            Tem certeza que deseja excluir o produto "{product.name}"? 
                            Esta ação não pode ser desfeita.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(product.id, product.name)}
                            className="bg-destructive hover:bg-destructive/90"
                          >
                            Excluir
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminProductList;