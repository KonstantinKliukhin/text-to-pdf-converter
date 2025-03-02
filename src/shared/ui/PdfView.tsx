"use client";
import type { ComponentProps } from "react";
import { memo, useEffect, useState, type FC } from "react";
import { Document, Page } from "react-pdf";
import useResizeObserver from "use-resize-observer";

import { Button } from "./Button";
import { cn } from "../lib/ui/cn";

type PdfViewProps = {
  url: string;
  width?: number;
  rootClassName?: string;
};

const BORDER_WIDTH = 2;

const PdfViewComponent: FC<PdfViewProps> = (props: PdfViewProps) => {
  const { url, width, rootClassName } = props;

  const [page, setPage] = useState(1);
  const [pagesCount, setPagesCount] = useState(1);

  const { ref, width: responsiveWidth = 1 } = useResizeObserver<HTMLDivElement>();

  const goNext = () => setPage((prevPage) => prevPage + 1);
  const goPrev = () => setPage((prevPage) => prevPage - 1);

  const isFirstPage = page === 1;
  const isLastPage = pagesCount === page;

  const showPagination = pagesCount > 1;

  const pdfWidth = width ? width : responsiveWidth - BORDER_WIDTH;

  const onLoadSuccess: ComponentProps<typeof Document>["onLoadSuccess"] = (document) => {
    setPagesCount(document.numPages);
  };

  useEffect(
    function resetStateOnUrlChange() {
      setPage(1);
      setPagesCount(1);
    },
    [url]
  );

  return (
    <div ref={ref} className={cn("space-y-2", rootClassName)}>
      <Document
        onLoadSuccess={onLoadSuccess}
        file={url}
        className="border border-indigo-900"
      >
        <Page width={pdfWidth} pageNumber={page} />
      </Document>
      {showPagination ? (
        <div className="flex items-center gap-x-2">
          <Button type="button" disabled={isFirstPage} onClick={goPrev}>
            Previous
          </Button>

          <p>
            Page {page} of {pagesCount}
          </p>

          <Button type="button" disabled={isLastPage} onClick={goNext}>
            Next
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export const PdfView = memo(PdfViewComponent);
