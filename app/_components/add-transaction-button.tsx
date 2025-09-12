"use client";

import { Button } from "./ui/button";
import { ArrowDownUpIcon } from "lucide-react";
import { useState } from "react";
import UpsertTransactionDialog from "./upsert-transaction-dialog";

const AddTransactionButton = () => {
  const [dialogIsOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <>
      <Button
        className="rounded-full font-bold"
        onClick={() => setDialogOpen(true)}
      >
        Adicionar transação
        <ArrowDownUpIcon className="ml-2 h-4 w-4" />
      </Button>

      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogOpen}
      />
    </>
  );
};

export default AddTransactionButton;
