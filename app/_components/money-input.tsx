import React, { forwardRef } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { Input, InputProps } from "@/app/_components/ui/input";

export const MoneyInput = forwardRef<
  HTMLInputElement,
  NumericFormatProps<InputProps>
>((props, ref) => {
  return (
    <NumericFormat
      {...props}
      thousandSeparator="."
      decimalSeparator=","
      prefix="R$ "
      allowNegative={false}
      customInput={Input}
      getInputRef={ref}
    />
  );
});

MoneyInput.displayName = "MoneyInput";
