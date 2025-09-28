import { auth } from "@clerk/nextjs/server";
import Navbar from "../_components/navbar";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader } from "../_components/ui/card";
import { CheckIcon, XIcon } from "lucide-react";

const SubscriptionPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/login");
  }

  return (
    <>
      <Navbar />
      <div className="p-6 space-y-6">
        <h1 className="font-bold text-2xl">Planos de Assinatura</h1>

        <div className="flex gap-6 flex-wrap">
          <Card className="w-[450px]">
            <CardHeader className="border-b border-solid py-8">
              <h2 className="font-bold text-2xl text-center">Starter</h2>
              <div className="flex items-center gap-3 justify-center">
                <span className="text-4xl">R$</span>
                <span className="font-semibold text-6xl">0</span>
                <div className="text-muted-foreground text-2xl">/mês</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-3">
                <CheckIcon className="text-primary" />
                <p>Até 12 transações por mês (9/12)</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon className="text-primary" />
                <p>Relatórios básicos de despesas</p>
              </div>
              <div className="flex items-center gap-3">
                <XIcon className="text-muted-foreground" />
                <p>Exportação CSV</p>
              </div>
              <div className="flex items-center gap-3">
                <XIcon className="text-muted-foreground" />
                <p>Alertas de gastos em tempo real</p>
              </div>
              <div className="flex items-center gap-3">
                <XIcon className="text-muted-foreground" />
                <p>Integração com múltiplas contas bancárias</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon className="text-primary" />
                <p>Suporte por e-mail em até 48h úteis</p>
              </div>
            </CardContent>
          </Card>

          <Card className="w-[450px]">
            <CardHeader className="border-b border-solid py-8">
              <h2 className="font-bold text-2xl text-center">Pro</h2>
              <div className="flex items-center gap-3 justify-center">
                <span className="text-4xl">R$</span>
                <span className="font-semibold text-6xl">28,90</span>
                <div className="text-muted-foreground text-2xl">/mês</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-3">
                <CheckIcon className="text-primary" />
                <p>Transações ilimitadas</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon className="text-primary" />
                <p>Relatórios avançados + exportação CSV</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon className="text-primary" />
                <p>Alertas de gastos em tempo real</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon className="text-primary" />
                <p>Integração com múltiplas contas bancárias</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon className="text-primary" />
                <p>Suporte por e-mail em até 12h úteis</p>
              </div>
              <button className="w-full rounded-full bg-primary text-white py-3 mt-4">
                Adquirir Plano
              </button>
            </CardContent>
          </Card>

          <Card className="w-[450px] border-primary shadow-lg">
            <CardHeader className="border-b border-solid py-8">
              <h2 className="font-bold text-2xl text-center text-primary">
                Pro Anual
              </h2>
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center gap-3">
                  <span className="text-4xl">R$</span>
                  <span className="font-semibold text-6xl">289</span>
                  <div className="text-muted-foreground text-2xl">/ano</div>
                </div>
                <span className="text-sm text-primary font-semibold mt-2">
                  2 meses grátis comparado ao mensal
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 py-8">
              <div className="flex items-center gap-3">
                <CheckIcon className="text-primary" />
                <p>Todos os benefícios do plano Pro</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon className="text-primary" />
                <p>Economia de ~16% no valor anual</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon className="text-primary" />
                <p>Relatório anual exclusivo de desempenho financeiro</p>
              </div>
              <div className="flex items-center gap-3">
                <CheckIcon className="text-primary" />
                <p>Suporte prioritário (resposta em até 6h úteis)</p>
              </div>
              <button className="w-full rounded-full bg-primary text-white py-3 mt-4">
                Adquirir Plano
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPage;
