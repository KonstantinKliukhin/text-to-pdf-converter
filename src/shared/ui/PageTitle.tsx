import type { ComponentProps, FC } from "react";

import { cn } from "../lib/ui/cn";

type PageTitleProps = ComponentProps<"h1">;

export const PageTitle: FC<PageTitleProps> = (props) => {
  const { className, ...restProps } = props;

  return (
    <h1
      className={cn(
        "text-center text-4xl font-bold text-indigo-800",
        "lg:text-6xl",
        className
      )}
      {...restProps}
    />
  );
};
