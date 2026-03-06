import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NossaHistoria = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-10 max-w-4xl">
          <h1 className="text-3xl font-bold text-foreground mb-8">Nossa História</h1>

          <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
            <p>
              A <strong className="text-foreground">Galinho Refrigeração</strong> está no mercado há mais de 30 anos, sendo referência no segmento de refrigeração comercial, industrial e residencial.
            </p>

            <p>
              Fundada em 1989, a empresa nasceu com o objetivo de atender à crescente demanda por soluções em climatização e refrigeração no Brasil. Desde então, a Galinho vem se consolidando como uma das principais distribuidoras de compressores, ar condicionado, purificadores de água e peças de reposição do país.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8">Nossa Missão</h2>
            <p>
              Oferecer produtos de alta qualidade para refrigeração e climatização, com atendimento especializado e preços competitivos, garantindo a satisfação total de nossos clientes.
            </p>

            <h2 className="text-2xl font-semibold text-foreground mt-8">Nossos Valores</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Compromisso com a qualidade</li>
              <li>Atendimento personalizado e especializado</li>
              <li>Transparência nas relações comerciais</li>
              <li>Inovação constante</li>
              <li>Respeito ao cliente e ao meio ambiente</li>
            </ul>

            <h2 className="text-2xl font-semibold text-foreground mt-8">Nossa Estrutura</h2>
            <p>
              Com sede em São Paulo, na Rua Dom Pedro Henrique de Orleans e Bragança, 470 – Vila Jaguara, a Galinho conta com uma estrutura completa de estoque e logística para atender clientes em todo o Brasil.
            </p>
            <p>
              Trabalhamos com as melhores marcas do mercado como Copeland, Danfoss, Bitzer, Midea, Samsung, LG, Carrier, IBBL, entre outras, oferecendo uma ampla gama de produtos para todas as necessidades de refrigeração e climatização.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NossaHistoria;
