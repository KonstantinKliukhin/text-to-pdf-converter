"use client";
import { isBefore } from "date-fns";
import Link from "next/link";
import { useCallback, useMemo, type FC } from "react";

import { APP_ROUTES } from "@/shared/config/app-routes";
import { usePromise } from "@/shared/lib/utils/use-promise";
import { Button } from "@/shared/ui/Button";

import { HistoryItemCard, pdfHistoryStorage } from "@/entities/pdf-history";

import { ShowPdfModalButton } from "@/features/show-pdf";

export const PdfHistoryList: FC = () => {
  const { data, isLoading, error } = usePromise(
    useCallback(() => pdfHistoryStorage.getAllHistoryItems(), [])
  );

  const sortedHistoryItems = useMemo(
    () =>
      [...(data || [])].sort((itemA, itemB) =>
        isBefore(itemA.createdAt, itemB.createdAt) ? 1 : -1
      ),
    [data]
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error && !data) {
    return <p>Error occurred</p>;
  }

  return (
    <ul className="space-y-8">
      {sortedHistoryItems?.map((item) => (
        <HistoryItemCard
          listItem
          key={item.id!}
          createdAt={item.createdAt}
          text={item.text}
          rightElement={<ShowPdfModalButton item={item}>View</ShowPdfModalButton>}
        />
      ))}
      {!sortedHistoryItems.length ? (
        <div className="space-y-4">
          <p className="text-center text-2xl">No History Yet</p>
          <Link href={APP_ROUTES.HOME} className="mx-auto block w-fit">
            <Button>Pdf to Text</Button>
          </Link>
        </div>
      ) : null}
    </ul>
  );
};
