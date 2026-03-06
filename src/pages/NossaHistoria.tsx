import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, TrendingUp, Leaf } from "lucide-react";

const NossaHistoria = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Nossa História
            </h1>
            <p className="text-xl opacity-90 max-w-2xl">
              Há mais de 35 anos fornecendo soluções em refrigeração e ar
              condicionado para todo o Brasil.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12 max-w-5xl">
          {/* Introduction */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Tradição e Qualidade
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              A Galinho Refrigeração nasceu em 1988 com a missão de oferecer
              soluções completas em refrigeração e ar condicionado para
              residências, comércios e indústrias. O que começou como uma
              pequena loja na zona oeste de São Paulo, cresceu para se tornar
              uma das referências do setor na região.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Ao longo de mais de três décadas, construímos parcerias sólidas
              com os maiores fabricantes mundiais de equipamentos de
              refrigeração, garantindo aos nossos clientes produtos de alta
              qualidade e tecnologia de ponta.
            </p>
          </section>

          {/* Stats */}
          <section className="grid md:grid-cols-4 gap-4 mb-12">
            <Card>
              <CardContent className="pt-6 text-center">
                <TrendingUp className="w-10 h-10 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground">35+</div>
                <div className="text-sm text-muted-foreground">
                  Anos de Mercado
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Users className="w-10 h-10 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground">50+</div>
                <div className="text-sm text-muted-foreground">
                  Funcionários
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Award className="w-10 h-10 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground">15+</div>
                <div className="text-sm text-muted-foreground">
                  Marcas Premium
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Users className="w-10 h-10 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-foreground">10k+</div>
                <div className="text-sm text-muted-foreground">
                  Clientes Ativos
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Values */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">
              Nossos Valores
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Qualidade
                  </h3>
                  <p className="text-muted-foreground">
                    trabalhamos apenas com produtos de marcas reconhecidas
                    internacionalmente, garantindo excelência em cada
                    equipamento vendido.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Atendimento Personalizado
                  </h3>
                  <p className="text-muted-foreground">
                    Nossa equipe técnica especializada oferece Consultoria
                    gratuita para ajudar você a escolher a melhor solução para
                    suas necessidades.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Compromisso com o Cliente
                  </h3>
                  <p className="text-muted-foreground">
                    Postamos todos os pedidos no mesmo dia útil. Facilitamos
                    pagamentos em até 12x sem juros para maior comodidade.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Sustentabilidade
                  </h3>
                  <p className="text-muted-foreground">
                    <div className="flex items-center gap-2 mb-2">
                      <Leaf className="w-5 h-5 text-green-600" />
                      <span className="font-medium">Produtos Eco-Friendly</span>
                    </div>
                    Priorizamos equipamentos com gases refrigerantes menos
                    agressivos ao meio ambiente e tecnologias de baixo consumo
                    energético.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Brands */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Parceiros Comerciais
            </h2>
            <p className="text-muted-foreground mb-6">
              Representamos as melhores marcas do mercado de refrigeração:
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-sm py-2 px-4">
                Carrier
              </Badge>
              <Badge variant="outline" className="text-sm py-2 px-4">
                Trane
              </Badge>
              <Badge variant="outline" className="text-sm py-2 px-4">
                Springer
              </Badge>
              <Badge variant="outline" className="text-sm py-2 px-4">
                Midea
              </Badge>
              <Badge variant="outline" className="text-sm py-2 px-4">
                Danfoss
              </Badge>
              <Badge variant="outline" className="text-sm py-2 px-4">
                Bitzer
              </Badge>
              <Badge variant="outline" className="text-sm py-2 px-4">
                Embraco
              </Badge>
              <Badge variant="outline" className="text-sm py-2 px-4">
                Tecumseh
              </Badge>
              <Badge variant="outline" className="text-sm py-2 px-4">
                EBM Papst
              </Badge>
              <Badge variant="outline" className="text-sm py-2 px-4">
                Rittal
              </Badge>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-muted rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Venha nos conhecer!
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Estamos prontos para atendê-lo com a mesma dedicação e qualidade
              de sempre. Visite nossa loja ou entre em contato!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/produtos"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
              >
                Ver Produtos
              </a>
              <a
                href="/contato"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
              >
                Fale Conosco
              </a>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NossaHistoria;
