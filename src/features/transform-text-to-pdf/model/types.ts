import type { z } from "zod";

import type { TRANSFORM_TEXT_TO_PDF_FORM_SCHEMA } from "./validation";

export type TransformTextToPdfFormType = z.infer<
  typeof TRANSFORM_TEXT_TO_PDF_FORM_SCHEMA
>;
