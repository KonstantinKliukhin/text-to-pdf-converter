import { mainApi } from "@/shared/api/main-api";
import { API_ROUTES } from "@/shared/config/api-routes";

import type { TransformTextToPdfDto } from "./dto/transform-text-to-pdf.dto";

export async function transformTextToPdf(dto: TransformTextToPdfDto): Promise<Blob> {
  const res = await mainApi.post<Blob>(API_ROUTES.CREATE_PDF, dto, {
    responseType: "blob",
  });

  return res.data;
}
