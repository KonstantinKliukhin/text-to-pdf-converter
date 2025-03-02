import { format } from "date-fns";
import { memo, type FC, type ReactNode } from "react";

import { PrimaryCard } from "@/shared/ui/PrimaryCard";

type HistoryItemCardProps = {
  rightElement?: ReactNode;
  listItem?: boolean;
  text: string;
  createdAt: string;
};

const HistoryItemCardComponent: FC<HistoryItemCardProps> = (props) => {
  const { rightElement, listItem, text, createdAt } = props;

  return (
    <PrimaryCard
      listItem={listItem}
      className="flex items-center justify-between rounded-lg bg-zinc-100 p-2 shadow-md"
    >
      <div>
        <h5 className="max-w-[200px] truncate text-xl font-medium">{text}</h5>
        <p>Created at: {format(createdAt, "MMM dd yyyy HH:mm:ss")}</p>
      </div>
      <div className="flex gap-x-2">{rightElement}</div>
    </PrimaryCard>
  );
};

export const HistoryItemCard = memo(HistoryItemCardComponent);
