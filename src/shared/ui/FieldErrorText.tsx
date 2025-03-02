import { memo, type ComponentProps } from "react";
import type { FieldError } from "react-hook-form";

type FieldErrorTextProps = ComponentProps<"p"> & {
  error?: FieldError;
};

const FieldErrorTextComponent = (props: FieldErrorTextProps) => {
  const { error, ...restProps } = props;

  if (!error?.message) return null;

  return (
    <p className="text-red-500" {...restProps}>
      {error.message}
    </p>
  );
};

export const FieldErrorText = memo(FieldErrorTextComponent);
