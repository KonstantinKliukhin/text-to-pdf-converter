import { memo, type ComponentProps, type FC } from "react";

import { cn } from "../lib/ui/cn";

type ButtonProps = ComponentProps<"button"> & {
  loading?: boolean;
};

const ButtonComponent: FC<ButtonProps> = (props) => {
  const { className, disabled, loading, ...restProps } = props;

  return (
    <button
      className={cn(
        "inline-flex rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
        "hover:bg-indigo-500",
        { "pointer-events-none opacity-50": loading || disabled },
        className
      )}
      disabled={disabled}
      {...restProps}
    />
  );
};

export const Button = memo(ButtonComponent);
