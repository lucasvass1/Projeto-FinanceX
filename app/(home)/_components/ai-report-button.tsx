"use client";

import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/app/_components/ui/dialog";
import { BotIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { useState } from "react";
import { generateAIReport } from "../_actions/generate-ai-report";

const AIReportButton = () => {
  const [relatorio, setRelatorio] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGerarRelatorio = async () => {
    setLoading(true);
    const texto = await generateAIReport("09"); // Ex.: mês de setembro
    setRelatorio(texto);
    setLoading(false);
  };

  return (
    <Dialog onOpenChange={(Open ) => {
        if (!Open ) {
            setRelatorio(null);
        }
    }}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          Gerar Relatório AI
          <BotIcon className="ml-2" />
        </Button>
      </DialogTrigger>

      
      <DialogContent className="max-w-2xl w-[90vw] max-h-[90vh] overflow-y-auto p-6 rounded-lg shadow-xl">
        <DialogHeader>
          <DialogTitle>Relatório IA</DialogTitle>

          {loading && (
            <DialogDescription>Gerando relatório...</DialogDescription>
          )}

          {!loading && relatorio && (
            <DialogDescription className="whitespace-pre-line leading-relaxed text-sm sm:text-base">
              {relatorio}
            </DialogDescription>
          )}

          {!loading && !relatorio && (
            <DialogDescription>
              Clique em "Gerar Relatório" para visualizar os dados.
            </DialogDescription>
          )}
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleGerarRelatorio} disabled={loading}>
            {loading ? "Gerando..." : "Gerar Relatório"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AIReportButton;
