"use client";

import { z } from "zod";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ArrowDownUpIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
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
import { addTransaction } from "../actions/add-transaction";

const TRANSACTION_CATEGORY_OPTIONS = Object.values(TransactionCategory).map(
  (category) => ({
    value: category,
    label:
      {
        HOUSING: "Habitação",
        TRANSPORTATION: "Transporte",
        FOOD: "Alimentação",
        ENTERTAINMENT: "Entretenimento",
        HEALTH: "Saúde",
        UTILITY: "Serviços públicos",
        SALARY: "Salário",
        EDUCATION: "Educação",
        OTHER: "Outros",
      }[category] || category,
  }),
);

const PAYMENT_METHOD_OPTIONS = Object.values(TransactionPaymentMethod).map(
  (method) => ({
    value: method,
    label:
      {
        BANK_TRANSFER: "Transferência Bancária",
        BANK_SLIP: "Boleto Bancário",
        CASH: "Dinheiro",
        CREDIT_CARD: "Cartão de crédito",
        DEBIT_CARD: "Cartão de Débito",
        OTHER: "Outros",
        PIX: "Pix",
      }[method] || method,
  }),
);

const formSchema = z.object({
  name: z.string().trim().min(1, { message: "O nome é obrigatório" }),
  amount: z.number().positive({ message: "O valor deve ser positivo" }),
  type: z.nativeEnum(TransactionType, {
    required_error: "O tipo é obrigatório.",
  }),
  category: z.nativeEnum(TransactionCategory, {
    required_error: "A categoria é obrigatória.",
  }),
  paymentMethod: z.nativeEnum(TransactionPaymentMethod, {
    required_error: "O método de pagamento é obrigatório",
  }),
  date: z.date({ required_error: "A data é obrigatória." }),
});

type FormSchema = z.infer<typeof formSchema>;

const AddTransactionButton = ({
  onTransactionAdded,
}: {
  onTransactionAdded: () => void;
}) => {
  const [open, setOpen] = useState(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      amount: 0,
      type: TransactionType.EXPENSE,
      category: TransactionCategory.OTHER,
      paymentMethod: TransactionPaymentMethod.CASH,
      date: new Date(),
    },
  });

  const onSubmit = async (data: FormSchema) => {
    try {
      await addTransaction(data);
      form.reset();
      setOpen(false);
      onTransactionAdded();
    } catch (error) {
      console.error("Erro ao adicionar transação:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full font-bold">
          Adicionar transação
          <ArrowDownUpIcon className="ml-2 h-4 w-4" />
        </Button>
      </DialogTrigger>

      {/* Ajuste no tamanho do modal para ser compacto e sem rolagem */}
      <DialogContent className="w-full max-w-xs p-3">
        <DialogHeader>
          <DialogTitle>Adicionar Transação</DialogTitle>
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
                      onValueChange={({ floatValue }) =>
                        field.onChange(floatValue)
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tipo de transação */}
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
                      <SelectItem value={TransactionType.EXPENSE}>
                        Despesa
                      </SelectItem>
                      <SelectItem value={TransactionType.DEPOSIT}>
                        Depósito
                      </SelectItem>
                      <SelectItem value={TransactionType.INVESTMENT}>
                        Investimento
                      </SelectItem>
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

            {/* Botões de ação */}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">Adicionar</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionButton;
