"use client";

import { z } from "zod";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from "@prisma/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { MoneyInput } from "./money-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { DatePicker } from "./ui/date-picker";
import { upsertTransaction } from "../actions/add-transaction";

// Props
interface UpsertTransactionDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  defaultValues?: TransactionFormValues;
  transactionId?: string;
}

// Schema de validação
const transactionSchema = z.object({
  name: z.string().trim().min(1, { message: "O nome é obrigatório" }),
  amount: z.number().positive({ message: "O valor deve ser positivo" }),
  type: z.nativeEnum(TransactionType, { required_error: "O tipo é obrigatório." }),
  category: z.nativeEnum(TransactionCategory, { required_error: "A categoria é obrigatória." }),
  paymentMethod: z.nativeEnum(TransactionPaymentMethod, { required_error: "O método de pagamento é obrigatório" }),
  date: z.date({ required_error: "A data é obrigatória." }),
});

type TransactionFormValues = z.infer<typeof transactionSchema>;

// Mock de opções
const TRANSACTION_CATEGORY_OPTIONS = [
  { value: TransactionCategory.FOOD, label: "Alimentação" },
  { value: TransactionCategory.TRANSPORT, label: "Transporte" },
];

const PAYMENT_METHOD_OPTIONS = [
  { value: TransactionPaymentMethod.CASH, label: "Dinheiro" },
  { value: TransactionPaymentMethod.CREDIT_CARD, label: "Cartão de Crédito" },
];

const UpsertTransactionDialog = ({
  isOpen,
  setIsOpen,
  defaultValues,
  transactionId,
}: UpsertTransactionDialogProps) => {
  const form = useForm<TransactionFormValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: defaultValues ?? {
      name: "",
      amount: 0,
      type: TransactionType.EXPENSE,
      category: TRANSACTION_CATEGORY_OPTIONS[0].value,
      paymentMethod: PAYMENT_METHOD_OPTIONS[0].value,
      date: new Date(),
    },
  });

  const onSubmit = async (data: TransactionFormValues) => {
    try {
      await upsertTransaction({ ...data, id: transactionId });
      setIsOpen(false);
      form.reset();
    } catch (error) {
      console.error("Erro ao adicionar transação:", error);
    }
  };

  const isUpdate = Boolean(transactionId);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) form.reset();
      }}
    >
      <DialogContent className="w-full max-w-xs p-3">
        <DialogHeader>
          <DialogTitle>{isUpdate ? "Atualizar" : "Criar"} Transação</DialogTitle>
          <DialogDescription>Insira as informações abaixo</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            {/* Nome */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da transação" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Valor */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <MoneyInput
                      placeholder="Digite o valor..."
                      value={field.value}
                      onValueChange={({ floatValue }) => field.onChange(floatValue ?? 0)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tipo */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={TransactionType.EXPENSE}>Despesa</SelectItem>
                      <SelectItem value={TransactionType.DEPOSIT}>Depósito</SelectItem>
                      <SelectItem value={TransactionType.INVESTMENT}>Investimento</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Categoria */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTION_CATEGORY_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Método de pagamento */}
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Método de Pagamento</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um método" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {PAYMENT_METHOD_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Data */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <DatePicker value={field.value} onChange={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Botões */}
            <div className="flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">{isUpdate ? "Atualizar" : "Adicionar"}</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpsertTransactionDialog;
