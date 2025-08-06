import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Lock, Eye, EyeOff } from "lucide-react";

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (login(password)) {
      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo ao painel administrativo!",
      });
      navigate('/admin');
    } else {
      toast({
        title: "Senha incorreta",
        description: "Verifique sua senha e tente novamente.",
        variant: "destructive",
      });
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-white to-cream flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-border/50 shadow-elegant">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-gold to-gold-light rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8 text-background" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-foreground">
              Painel Administrativo
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              Digite a senha para acessar o painel de gerenciamento
            </CardDescription>
          </div>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Senha de Acesso
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  className="pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-gold hover:bg-gold-dark text-background font-medium"
              size="lg"
            >
              Entrar no Painel
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-muted/50 rounded-lg">
            <p className="text-xs text-muted-foreground text-center">
              Acesso restrito aos administradores do sistema
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;