"use client";
import { useCallback, useState, type FC } from "react";
import { toast } from "sonner";

import { PdfView } from "@/shared/ui/PdfView";

import { TransformTextToPdfForm } from "@/features/transform-text-to-pdf";

export const HomePageContent: FC = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const onPdfTransformed = useCallback(async (data: { blob: Blob; text: string }) => {
    const url = URL.createObjectURL(data.blob);

    setPdfUrl(url);

    try {
      // this module loads dexie lib which is heavy.
      // We don't need this module to be loaded initially so we can load it when it is needed
      const { pdfHistoryStorage } = await import("@/entities/pdf-history");

      pdfHistoryStorage.addHistoryItem(data);
    } catch (error) {
      toast.error("Error occurred while saving your pdf to history");
    }
  }, []);

  return (
    <>
      <TransformTextToPdfForm onSuccess={onPdfTransformed} />

      {pdfUrl && (
        <div className="space-y-2" data-testid="HomePageContent.showPdfBlock">
          <h2 className="text-2xl font-semibold">Your PDF</h2>
          <PdfView rootClassName="h-[800px] w-[100%]" url={pdfUrl} />
        </div>
      )}
    </>
  );
};
