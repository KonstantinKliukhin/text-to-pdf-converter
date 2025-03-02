"use client";

import type { ComponentProps } from "react";
import { useCallback, useMemo, useState, type FC } from "react";

import { Button } from "@/shared/ui/Button";

import type { PdfHistoryItem } from "@/entities/pdf-history";

import { ShowPdfModal } from "./ShowPdfModal";

type ShowPdfModalButtonProps = ComponentProps<typeof Button> & {
  item: PdfHistoryItem;
};

export const ShowPdfModalButton: FC<ShowPdfModalButtonProps> = (props) => {
  const { item, ...restProps } = props;

  const [open, setOpen] = useState(false);

  const pdfUrl = useMemo(() => URL.createObjectURL(item.data), [item.data]);

  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);

  return (
    <>
      <Button onClick={openModal} {...restProps} />
      <ShowPdfModal showRightTopClose pdfUrl={pdfUrl} open={open} onClose={closeModal} />
    </>
  );
};
