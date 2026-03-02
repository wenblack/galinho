const Newsletter = () => {
  return (
    <section className="newsletter-bg py-10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-primary-foreground text-xl md:text-2xl font-bold mb-2">
          Quer receber as nossas novidades?
        </h2>
        <p className="text-primary-foreground/80 text-sm mb-6">
          Assine nossa Newsletter!
        </p>
        <form className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
          <input
            type="email"
            placeholder="Digite seu e-mail"
            className="w-full sm:flex-1 py-2.5 px-4 rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            type="submit"
            className="cta-gradient text-accent-foreground font-bold py-2.5 px-8 rounded-md text-sm uppercase tracking-wider hover:opacity-90 transition-opacity shrink-0"
          >
            Enviar
          </button>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
