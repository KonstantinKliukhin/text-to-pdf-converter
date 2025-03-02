import type { FC, PropsWithChildren } from "react";

import { Header } from "@/widgets/header";

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Header />
      <main className="container">{children}</main>
    </>
  );
};
