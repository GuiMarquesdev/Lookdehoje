import { useState } from "react";
import { useHero, HeroImageMode } from "@/contexts/HeroContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Plus, Trash2, Upload, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AdminHeroManager = () => {
  const { mode, images, setMode, addImage, deleteImage, updateImage } = useHero();
  const { toast } = useToast();
  const [newImageUrl, setNewImageUrl] = useState("");
  const [newImageAlt, setNewImageAlt] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleModeChange = (newMode: HeroImageMode) => {
    setMode(newMode);
    toast({
      title: "Modo atualizado",
      description: `Modo alterado para ${newMode === 'static' ? 'imagem estática' : 'carrossel'}`
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddImage = () => {
    const imageUrl = uploadedImage || newImageUrl.trim();
    
    if (!imageUrl || !newImageAlt.trim()) {
      toast({
        title: "Erro",
        description: "Imagem e texto alternativo são obrigatórios",
        variant: "destructive"
      });
      return;
    }

    if (images.length >= 3) {
      toast({
        title: "Limite atingido",
        description: "Máximo de 3 imagens permitidas",
        variant: "destructive"
      });
      return;
    }

    try {
      addImage({
        url: imageUrl,
        alt: newImageAlt
      });
      setNewImageUrl("");
      setNewImageAlt("");
      setUploadedImage(null);
      toast({
        title: "Imagem adicionada",
        description: "Nova imagem foi adicionada com sucesso"
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: (error as Error).message,
        variant: "destructive"
      });
    }
  };

  const handleDeleteImage = (id: string) => {
    try {
      deleteImage(id);
      toast({
        title: "Imagem removida",
        description: "Imagem foi removida com sucesso"
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: (error as Error).message,
        variant: "destructive"
      });
    }
  };

  const handleUpdateImageAlt = (id: string, alt: string) => {
    updateImage(id, { alt });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Configuração do Hero
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Modo de Exibição */}
          <div>
            <Label className="text-base font-medium mb-3 block">Modo de Exibição</Label>
            <RadioGroup
              value={mode}
              onValueChange={handleModeChange}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="static" id="static" />
                <Label htmlFor="static">Imagem Estática</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="carousel" id="carousel" />
                <Label htmlFor="carousel">Carrossel (até 3 imagens)</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Lista de Imagens */}
          <div>
            <Label className="text-base font-medium mb-3 block">
              Imagens ({images.length}/3)
            </Label>
            <div className="grid gap-4">
              {images.map((image, index) => (
                <Card key={image.id} className="p-4">
                  <div className="flex items-start gap-4">
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Imagem {index + 1}</span>
                        {images.length > 1 && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteImage(image.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      <Input
                        placeholder="Texto alternativo"
                        value={image.alt}
                        onChange={(e) => handleUpdateImageAlt(image.id, e.target.value)}
                      />
                      <p className="text-sm text-muted-foreground truncate">
                        {image.url}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Adicionar Nova Imagem */}
          {images.length < 3 && (
            <Card className="border-dashed">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    <Plus className="h-4 w-4" />
                    Adicionar Nova Imagem
                  </div>
                  <div className="space-y-4">
                    {/* Upload de Imagem */}
                    <div>
                      <Label className="text-sm font-medium">Imagem</Label>
                      <div className="border-2 border-dashed border-border rounded-lg p-4 text-center mt-2">
                        {uploadedImage ? (
                          <div className="space-y-3">
                            <img
                              src={uploadedImage}
                              alt="Preview"
                              className="mx-auto max-h-32 rounded-lg object-cover"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setUploadedImage(null)}
                            >
                              Remover Imagem
                            </Button>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <Upload className="mx-auto w-8 h-8 text-muted-foreground" />
                            <div>
                              <label className="cursor-pointer">
                                <span className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-md text-sm font-medium transition-colors">
                                  Escolher Arquivo
                                </span>
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={handleImageUpload}
                                  className="hidden"
                                />
                              </label>
                              <p className="text-xs text-muted-foreground mt-1">
                                PNG, JPG até 5MB
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* URL alternativa */}
                    {!uploadedImage && (
                      <div>
                        <Label className="text-sm text-muted-foreground">Ou cole uma URL</Label>
                        <Input
                          placeholder="https://exemplo.com/imagem.jpg"
                          value={newImageUrl}
                          onChange={(e) => setNewImageUrl(e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    )}

                    {/* Texto alternativo */}
                    <div>
                      <Label htmlFor="imageAlt" className="text-sm">Texto Alternativo *</Label>
                      <Input
                        id="imageAlt"
                        placeholder="Descrição da imagem"
                        value={newImageAlt}
                        onChange={(e) => setNewImageAlt(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    
                    <Button onClick={handleAddImage} className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Adicionar Imagem
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Informações */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Dicas:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Use imagens de alta qualidade (mínimo 1920x1080px)</li>
              <li>• No modo carrossel, as imagens alternam a cada 5 segundos</li>
              <li>• Sempre adicione um texto alternativo descritivo</li>
              <li>• As imagens podem ser URLs de serviços como o Lovable Uploads</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminHeroManager;