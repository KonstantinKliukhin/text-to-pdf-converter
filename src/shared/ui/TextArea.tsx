import { memo, type ComponentProps, type FC } from "react";

import { cn } from "../lib/ui/cn";

type TextAreaProps = ComponentProps<"textarea">;

const TextAreaComponent: FC<TextAreaProps> = (props) => {
  const { className, ...restProps } = props;

  return (
    <textarea
      className={cn(
        "block w-full resize-y rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300",
        "sm:text-sm/6",
        "focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600",
        "placeholder:text-gray-400",
        className
      )}
      {...restProps}
    />
  );
};

export const TextArea = memo(TextAreaComponent);
