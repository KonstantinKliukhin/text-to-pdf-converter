import { memo, type PropsWithChildren } from "react";

import { cn } from "../lib/ui/cn";

type PrimaryCardProps = PropsWithChildren & {
  className?: string;
  listItem?: boolean;
};

const PrimaryCardComponent = (props: PrimaryCardProps) => {
  const { listItem, className, children } = props;

  const Card = listItem ? "li" : "div";

  return (
    <Card className={cn("rounded-lg bg-zinc-100 p-2 shadow-md", className)}>
      {children}
    </Card>
  );
};

export const PrimaryCard = memo(PrimaryCardComponent);
