"use client";
import type { FC, PropsWithChildren } from "react";

import { PdfViewProvider } from "./PdfViewProvider";

export const AllProviders: FC<PropsWithChildren> = ({ children }) => (
  <PdfViewProvider>{children}</PdfViewProvider>
);
