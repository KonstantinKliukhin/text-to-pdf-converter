"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { memo, type FC } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/shared/ui/Button";
import { FieldErrorText } from "@/shared/ui/FieldErrorText";
import { TextArea } from "@/shared/ui/TextArea";

import { transformTextToPdf } from "../../api/services";
import { TRANSFORM_TEXT_TO_PDF_FORM_DEFAULT_VALUES } from "../../model/constants";
import type { TransformTextToPdfFormType } from "../../model/types";
import { TRANSFORM_TEXT_TO_PDF_FORM_SCHEMA } from "../../model/validation";

type TransformTextToPdfFormProps = {
  onSuccess: (data: { blob: Blob; text: string }) => void;
};

const TransformTextToPdfFormComponent: FC<TransformTextToPdfFormProps> = (props) => {
  const { onSuccess } = props;

  const form = useForm<TransformTextToPdfFormType>({
    defaultValues: TRANSFORM_TEXT_TO_PDF_FORM_DEFAULT_VALUES,
    resolver: zodResolver(TRANSFORM_TEXT_TO_PDF_FORM_SCHEMA),
  });

  const onSubmit = async (data: TransformTextToPdfFormType) => {
    try {
      const blob = await transformTextToPdf({ text: data.text });

      form.reset(TRANSFORM_TEXT_TO_PDF_FORM_DEFAULT_VALUES);

      onSuccess({ blob, text: data.text });
    } catch (error) {
      toast.error("Unknown error occurred. Please contact support");
    }
  };

  return (
    <FormProvider {...form}>
      <form
        data-testid="TransformTextToPdfForm.form"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Controller
          control={form.control}
          name="text"
          render={({ field, fieldState }) => (
            <div className="space-y-2">
              <TextArea
                data-testid="TransformTextToPdfForm.textTextarea"
                className="h-[200px] max-h-[400px]"
                {...field}
                rows={10}
              />
              <FieldErrorText
                data-testid="TransformTextToPdfForm.textError"
                error={fieldState.error}
              />
            </div>
          )}
        />

        <Button
          data-testid="TransformTextToPdfForm.submitButton"
          loading={form.formState.isSubmitting}
          className="ml-auto mt-4 flex h-fit"
          type="submit"
        >
          Transform to PDF
        </Button>
      </form>
    </FormProvider>
  );
};

export const TransformTextToPdfForm = memo(TransformTextToPdfFormComponent);
