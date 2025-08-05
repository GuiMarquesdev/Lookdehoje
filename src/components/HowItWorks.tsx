import { Card, CardContent } from "@/components/ui/card";
import { Search, MessageCircle, Truck, RotateCcw } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: "Escolha seu Look",
      description: "Navegue pela nossa coleção e encontre o look perfeito para sua ocasião especial."
    },
    {
      icon: MessageCircle,
      title: "Entre em Contato",
      description: "Fale conosco pelo WhatsApp ou Instagram para confirmar disponibilidade e detalhes."
    },
    {
      icon: Truck,
      title: "Receba em Casa",
      description: "Entregamos seu look no conforto da sua casa com todo cuidado e pontualidade."
    },
    {
      icon: RotateCcw,
      title: "Devolva Fácil",
      description: "Após o uso, devolvemos com praticidade. Você só precisa se preocupar em arrasar!"
    }
  ];

  return (
    <section id="como-funciona" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Como <span className="text-gold">Funciona</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Alugue looks incríveis em apenas 4 passos simples
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="relative text-center group hover:shadow-elegant transition-all duration-300 border-border/50 hover:border-gold/30">
              <CardContent className="p-8">
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gold text-background rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                
                {/* Icon */}
                <div className="flex justify-center mb-6 mt-4">
                  <div className="w-16 h-16 bg-cream rounded-full flex items-center justify-center group-hover:bg-gold group-hover:text-background transition-all duration-300">
                    <step.icon size={28} />
                  </div>
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-gold transition-colors">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-gold/10 to-gold-light/10 rounded-2xl p-8 max-w-2xl mx-auto border border-gold/20">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Pronta para arrasar?
            </h3>
            <p className="text-muted-foreground mb-6">
              Entre em contato conosco e encontre o look perfeito para sua próxima ocasião especial.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-gold text-background rounded-lg font-medium hover:bg-gold-dark transition-colors shadow-gold"
              >
                Falar no WhatsApp
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-gold text-gold rounded-lg font-medium hover:bg-gold hover:text-background transition-colors"
              >
                Seguir no Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;