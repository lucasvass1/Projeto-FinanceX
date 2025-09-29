"use server";

import { db } from "@/app/_lib/prisma";

// Texto fake de relatório (multi-linha com template literal)
const DUMMY_REPORT = `Relatório Financeiro Pessoal – Setembro/2025

1. Resumo Geral
Renda Total no Mês: R$ 8.500,00
Total de Gastos: R$ 6.200,00
Saldo Líquido: R$ 2.300,00

💡 Insight: Houve sobra de 27% da renda, um resultado positivo.
Meta recomendada: manter pelo menos 20% da renda em poupança ou investimentos.

2. Fontes de Renda
Fonte                 Valor (R$)
Salário               7.500,00
Trabalho freelancer   1.000,00
Renda de investimentos 0,00
Total                 8.500,00

💡 Insight: O trabalho freelancer representou 12% da renda total, ajudando a compensar gastos extras do mês.

3. Despesas Mensais
Categoria                                      Valor (R$)   % da Renda
Moradia (aluguel/condomínio)                   2.000,00     23%
Alimentação (supermercado + refeições fora)    1.600,00     19%
Transporte (combustível, app, manutenção)        900,00     11%
Lazer (viagens, cinema, hobbies)                 750,00      9%
Saúde (plano, medicamentos)                      500,00      6%
Educação (cursos, livros)                        250,00      3%
Outros (compras diversas, presentes)             200,00      2%
Total                                          6.200,00     73%

💡 Insights:
- Alimentação representa 19% da renda, acima da média recomendada (10–15%).
- Transporte é o segundo maior gasto variável: pode ser otimizado com caronas ou transporte público em alguns trajetos.

4. Investimentos e Poupança
Aplicação em poupança/investimentos no mês: R$ 1.500,00
Reserva de emergência acumulada: R$ 18.000,00

💡 Insight: A reserva já cobre aproximadamente 3 meses de despesas (ideal é 6 meses). Bom progresso, mas ainda há espaço para reforço.

5. Recomendações Estratégicas
- Reduzir gastos em alimentação fora de casa, buscando cozinhar mais em casa ou aproveitar promoções.
- Destinar parte do saldo (pelo menos R$ 800,00) para investimentos de longo prazo (ex.: renda fixa ou fundos de índice).
- Avaliar planos de transporte ou compartilhar corridas para diminuir custo de mobilidade.

📌 Conclusão
O mês de setembro fechou com saldo positivo de R$ 2.300,00, permitindo investir e reforçar a reserva de emergência.
O maior ponto de atenção está em alimentação e transporte, que juntos somam 30% da renda — um nível que pode ser otimizado sem comprometer a qualidade de vida.
`;

export const generateAIReport = async (month: string) => {
  // Se não houver chave de API, retorna o relatório dummy após 2 segundos
  if (!process.env.OPENAI_API_KEY) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return DUMMY_REPORT;
  }

  // Busca transações no banco para o mês informado
  const transactions = await db.transaction.findMany({
    where: {
      date: {
        gte: new Date(`2024-${month}-01`),
        lt: new Date(`2024-${month}-31`), // atenção: para meses com 28/30 dias você pode precisar de lógica extra
      },
    },
  });

  // 👉 Aqui você pode gerar o relatório real a partir das 'transactions'
  // Exemplo: return generateReportFromTransactions(transactions);

  return transactions; // placeholder
};
