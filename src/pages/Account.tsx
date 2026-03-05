import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import {
  User,
  Mail,
  Phone,
  Calendar,
  LogOut,
  Package,
  Heart,
  ShoppingCart,
} from "lucide-react";

const Account = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();

  // Wait for auth to finish loading before checking authentication
  React.useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
      duration: 3000,
    });
    navigate("/");
  };

  if (!user) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="top-0 w-full">
        <Header />
      </div>

      <main className="flex-1 pb-10 relative">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Minha Conta</h1>

          <div className="grid gap-6 md:grid-cols-2">
            {/* User Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Dados Pessoais
                </CardTitle>
                <CardDescription>Informações da sua conta</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Nome</p>
                    <p className="font-medium">{user.name}</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                </div>

                {user.phone && (
                  <>
                    <Separator />
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Telefone
                        </p>
                        <p className="font-medium">{user.phone}</p>
                      </div>
                    </div>
                  </>
                )}

                {user.cpf && (
                  <>
                    <Separator />
                    <div className="flex items-center gap-3">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">CPF</p>
                        <p className="font-medium">{user.cpf}</p>
                      </div>
                    </div>
                  </>
                )}

                <Separator />

                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Membro desde
                    </p>
                    <p className="font-medium">
                      {new Date(user.createdAt).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Ações Rápidas
                </CardTitle>
                <CardDescription>Acesse suas áreas principais</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate("/wishlist")}
                >
                  <Heart className="w-4 h-4 mr-2" />
                  Minha Wishlist
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => navigate("/cart")}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Meu Carrinho
                </Button>

                <Separator className="my-4" />

                <Button
                  variant="destructive"
                  className="w-full"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sair da conta
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Orders Section */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Meus Pedidos
              </CardTitle>
              <CardDescription>Histórico de pedidos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Nenhum pedido realizado ainda.</p>
                <Button
                  variant="link"
                  onClick={() => navigate("/")}
                  className="mt-2"
                >
                  Começar a comprar
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <div className="bottom-0 w-full">
        <Footer />
      </div>
    </div>
  );
};

export default Account;
