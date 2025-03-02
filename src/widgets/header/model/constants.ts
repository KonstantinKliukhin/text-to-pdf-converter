import { APP_ROUTES } from "@/shared/config/app-routes";

type HeaderLink = {
  label: string;
  href: string;
};

export const HEADER_LINKS: HeaderLink[] = [
  {
    label: "Pdf to Text",
    href: APP_ROUTES.HOME,
  },
  {
    label: "History",
    href: APP_ROUTES.HISTORY,
  },
];
