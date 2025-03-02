import { memo, type ComponentProps, type FC } from "react";

import { PdfView } from "@/shared/ui/PdfView";
import { PrimaryDialog } from "@/shared/ui/PrimaryDialog";

type ShowPdfModalProps = Omit<ComponentProps<typeof PrimaryDialog>, "children"> & {
  pdfUrl: string;
};

const ShowPdfModalComponent: FC<ShowPdfModalProps> = (props) => {
  const { pdfUrl, ...restProps } = props;

  return (
    <PrimaryDialog showRightTopClose {...restProps}>
      <div className="px-6 py-4">
        <PdfView width={500} url={pdfUrl} />
      </div>
    </PrimaryDialog>
  );
};

export const ShowPdfModal = memo(ShowPdfModalComponent);
