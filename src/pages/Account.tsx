import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useOrders } from "@/contexts/OrderContext";
import { mockProducts } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Edit2,
  Save,
  X,
  MapPin,
} from "lucide-react";

const Account = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated, isLoading, updateUser } = useAuth();
  const { getOrdersByUser } = useOrders();
  const { toast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [editEmail, setEditEmail] = useState("");
  const [editAddress, setEditAddress] = useState("");
  const [editErrors, setEditErrors] = useState<{
    email?: string;
    address?: string;
  }>({});

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

  const handleEditClick = () => {
    if (user) {
      setEditEmail(user.email);
      setEditAddress(user.address || "");
      setIsEditing(true);
      setEditErrors({});
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditErrors({});
  };

  const handleSaveEdit = async () => {
    const newErrors: typeof editErrors = {};

    if (!editEmail.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(editEmail)) {
      newErrors.email = "Email inválido";
    }

    if (Object.keys(newErrors).length > 0) {
      setEditErrors(newErrors);
      return;
    }

    const success = await updateUser({
      email: editEmail,
      address: editAddress,
    });

    if (success) {
      setIsEditing(false);
      toast({
        title: "Dados atualizados",
        description: "Suas informações foram atualizadas com sucesso.",
        duration: 3000,
      });
    } else {
      setEditErrors({ email: "Este email já está em uso" });
    }
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
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Dados Pessoais
                    </CardTitle>
                    <CardDescription>Informações da sua conta</CardDescription>
                  </div>
                  {!isEditing && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleEditClick}
                    >
                      <Edit2 className="w-4 h-4 mr-1" />
                      Editar
                    </Button>
                  )}
                </div>
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

                {isEditing ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="editEmail">Email</Label>
                      <Input
                        id="editEmail"
                        type="email"
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                      />
                      {editErrors.email && (
                        <p className="text-sm text-red-500">
                          {editErrors.email}
                        </p>
                      )}
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <Label htmlFor="editAddress">Endereço</Label>
                      <Input
                        id="editAddress"
                        type="text"
                        placeholder="Rua, número, bairro, cidade, estado"
                        value={editAddress}
                        onChange={(e) => setEditAddress(e.target.value)}
                      />
                      {editErrors.address && (
                        <p className="text-sm text-red-500">
                          {editErrors.address}
                        </p>
                      )}
                    </div>

                    <Separator />

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={handleSaveEdit}
                        disabled={isLoading}
                      >
                        <Save className="w-4 h-4 mr-1" />
                        Salvar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancelEdit}
                      >
                        <X className="w-4 h-4 mr-1" />
                        Cancelar
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{user.email}</p>
                      </div>
                    </div>

                    {user.address && (
                      <>
                        <Separator />
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm text-muted-foreground">
                              Endereço
                            </p>
                            <p className="font-medium">{user.address}</p>
                          </div>
                        </div>
                      </>
                    )}

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
                          {new Date(user.createdAt).toLocaleDateString(
                            "pt-BR",
                            {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            },
                          )}
                        </p>
                      </div>
                    </div>
                  </>
                )}
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
