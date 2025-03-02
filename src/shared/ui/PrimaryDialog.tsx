import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { memo, type FC, type PropsWithChildren } from "react";

type PrimaryDialogProps = PropsWithChildren & {
  open: boolean;
  onClose: () => void;
  showRightTopClose?: boolean;
};

export const PrimaryDialogComponent: FC<PrimaryDialogProps> = (props) => {
  const { open, onClose, children, showRightTopClose = false } = props;

  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in fixed inset-0 bg-gray-500/75 transition-opacity"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in data-closed:sm:translate-y-0 data-closed:sm:scale-95 relative overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl"
          >
            {showRightTopClose ? (
              <button
                onClick={onClose}
                className="absolute right-1 top-1 z-10 size-6 rounded-full font-extrabold hover:scale-125"
              >
                X
              </button>
            ) : null}
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export const PrimaryDialog = memo(PrimaryDialogComponent);
