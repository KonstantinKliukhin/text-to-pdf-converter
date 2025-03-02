import { object, string } from "zod";

const MAX_SYMBOLS_COUNT = 15_000;

export const TRANSFORM_TEXT_TO_PDF_FORM_SCHEMA = object({
  text: string()
    .min(1, "Write at least 1 sybmol")
    .max(MAX_SYMBOLS_COUNT, `Maximum text length is ${MAX_SYMBOLS_COUNT} characters`),
});
