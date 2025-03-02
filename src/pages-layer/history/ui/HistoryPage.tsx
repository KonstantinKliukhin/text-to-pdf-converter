import type { FC } from "react";

import { PageTitle } from "@/shared/ui/PageTitle";

import { PdfHistoryList } from "@/widgets/pdf-history-list";

export const HistoryPage: FC = () => {
  return (
    <div className="space-y-20 py-20">
      <PageTitle>History</PageTitle>

      <PdfHistoryList />
    </div>
  );
};
