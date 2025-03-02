import { type FC } from "react";

import { PageTitle } from "@/shared/ui/PageTitle";

import { HomePageContent } from "./HomePageContent";

export const HomePage: FC = () => {
  return (
    <div className="space-y-20 py-20">
      <PageTitle>Text to PDF</PageTitle>
      <HomePageContent />
    </div>
  );
};
