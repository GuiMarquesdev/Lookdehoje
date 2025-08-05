import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Instagram, Clock, Mail } from "lucide-react";

const Contact = () => {
  return (
    <section id="contato" className="py-20 bg-warm-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Entre em <span className="text-gold">Contato</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Estamos aqui para te ajudar a encontrar o look perfeito. Fale conosco!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                Vamos conversar?
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Nossa equipe está pronta para te atender e ajudar a escolher o look ideal 
                para sua ocasião especial. Entre em contato conosco através dos canais abaixo.
              </p>
            </div>

            <div className="space-y-6">
              {/* WhatsApp */}
              <Card className="hover:shadow-elegant transition-all duration-300 border-border/50 hover:border-gold/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Phone size={24} className="text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-foreground mb-1">WhatsApp</h4>
                      <p className="text-muted-foreground mb-3">Atendimento rápido e personalizado</p>
                      <Button asChild size="sm" className="shadow-gold">
                        <a
                          href="https://wa.me/5511999999999"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Conversar Agora
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Instagram */}
              <Card className="hover:shadow-elegant transition-all duration-300 border-border/50 hover:border-gold/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                      <Instagram size={24} className="text-pink-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-foreground mb-1">Instagram</h4>
                      <p className="text-muted-foreground mb-3">Veja nossos looks e inspirações</p>
                      <Button variant="outline" asChild size="sm" className="hover:bg-gold hover:text-background hover:border-gold">
                        <a
                          href="https://instagram.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Seguir @lookrental
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Email */}
              <Card className="hover:shadow-elegant transition-all duration-300 border-border/50 hover:border-gold/30">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Mail size={24} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-foreground mb-1">E-mail</h4>
                      <p className="text-muted-foreground">contato@lookrental.com.br</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Business Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">
                Informações do Negócio
              </h3>
            </div>

            <div className="space-y-6">
              {/* Hours */}
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
                      <Clock size={24} className="text-gold" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Horário de Atendimento</h4>
                      <div className="space-y-2 text-muted-foreground">
                        <p>Segunda a Sexta: 9h às 18h</p>
                        <p>Sábado: 9h às 15h</p>
                        <p>Domingo: Fechado</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location */}
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gold/10 rounded-full flex items-center justify-center">
                      <MapPin size={24} className="text-gold" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-foreground mb-3">Localização</h4>
                      <div className="space-y-2 text-muted-foreground">
                        <p>São Paulo - SP</p>
                        <p>Entregamos em toda a Grande São Paulo</p>
                        <p className="text-sm text-gold font-medium">
                          Consulte outras regiões via WhatsApp
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CTA */}
              <div className="bg-gradient-to-br from-gold/10 to-gold-light/5 rounded-xl p-6 border border-gold/20">
                <h4 className="text-lg font-semibold text-foreground mb-3">
                  Atendimento Personalizado
                </h4>
                <p className="text-muted-foreground mb-4 text-sm">
                  Nossa consultora de moda está pronta para te ajudar a escolher 
                  o look perfeito para sua ocasião especial.
                </p>
                <Button size="sm" asChild className="w-full shadow-gold">
                  <a
                    href="https://wa.me/5511999999999?text=Olá! Gostaria de um atendimento personalizado para escolher um look."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Solicitar Consultoria
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;