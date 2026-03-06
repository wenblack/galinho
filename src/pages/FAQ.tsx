import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "O que é a Galinho Refrigeração?",
    answer: "A Galinho é uma empresa especializada na venda de produtos para refrigeração em geral, com mais de 30 anos no mercado, especializada no atendimento tanto de grandes indústrias, como para ambientes residenciais e comercial leve (split piso e teto), bem como suas peças de reposição. Além disso, comercializa os insumos necessários para instalações de splits e refrigeração comercial.",
  },
  {
    question: "Qual o período de garantia do meu condicionador de ar?",
    answer: "O período de garantia pode variar de um modelo para outro, e alguns componentes internos podem ter a garantia distinta do restante do equipamento (como por exemplo, o compressor). Para maiores informações sobre a garantia de cada produto, consulte o impresso com instruções que enviamos com cada produto.",
  },
  {
    question: "O que é um compressor?",
    answer: "O compressor é o coração do seu condicionador de ar, independente do seu modelo ou capacidade. Nos equipamentos do tipo janela e split, podem variar em compressor rotativo ou alternativo.",
  },
  {
    question: "O que é compressor rotativo?",
    answer: "São aqueles cujos componentes exercem entre si um baixíssimo atrito para executar a função, proporcionando menor nível de ruído e máxima eficiência energética, isto é, reduzido consumo de energia.",
  },
  {
    question: "O que é o sistema Inverter?",
    answer: "É uma tecnologia onde o compressor trabalha com variação de velocidade e frequência, com isto, economiza em até 40% o consumo de energia elétrica.",
  },
  {
    question: "Qual a diferença entre o Sistema Convencional e o Inverter?",
    answer: "O compressor convencional não tem velocidade variável e sempre será fixa, com isto, consome mais energia elétrica.",
  },
  {
    question: "O que é BTU/h?",
    answer: "As iniciais se referem ao termo British Thermal Unit (Unidade Térmica Britânica). Trata-se da unidade de medida utilizada para refrigeração e que corresponde à capacidade de refrigeração que o condicionador de ar deve demandar para garantir o conforto do seu ambiente.",
  },
  {
    question: "Existem aparelhos 110V?",
    answer: 'Os aparelhos do tipo Split são fabricados à partir de 220V. Com a possibilidade de 110V, recomendamos o uso de aparelhos conhecidos como "ACJ – Ar Condicionado de Janela".',
  },
  {
    question: "Quais os condicionadores de ar que consomem menos energia?",
    answer: "São aqueles que possuem compressor rotativo ou de compressor de velocidade variável (Sistema Inverter).",
  },
  {
    question: "O que é um Chiller?",
    answer: "Chiller é um resfriador de líquido, utilizado tanto para soluções de conforto ambiental, quanto para integrar soluções industriais.",
  },
  {
    question: "O que é evaporadora e condensadora?",
    answer: "Condensadora: Num sistema Split, é o módulo que fica do lado externo do ambiente, expulsando o ar quente. É na condensadora que fica o compressor do aparelho. Evaporadora: É o módulo que fica no interior do ambiente, insuflando o ar frio (ou quente, nos modelos de ciclo reverso).",
  },
  {
    question: "Posso instalar o ar condicionado por conta própria?",
    answer: "Não, para garantia do produto e seu perfeito funcionamento, é necessário que a instalação seja feita por uma empresa autorizada ou credenciada pelo fabricante.",
  },
  {
    question: "O Ar Condicionado faz muito barulho?",
    answer: "Sim, possui um leve ruído. No caso dos Splits, o barulho maior está na unidade externa (onde fica a maior fonte de ruído que é o compressor), diminuindo portanto os ruídos na unidade interna.",
  },
];

const FAQ = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-10 max-w-4xl">
          <h1 className="text-3xl font-bold text-foreground mb-8">Perguntas Frequentes</h1>

          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-foreground">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-8 p-6 bg-muted rounded-lg">
            <p className="text-muted-foreground">
              Ficou ainda alguma dúvida? Sem problemas, entre em contato com nossa equipe de vendas!{" "}
              <a href="/contato" className="text-primary font-medium hover:underline">
                Clique aqui
              </a>{" "}
              para enviar sua mensagem.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ;
