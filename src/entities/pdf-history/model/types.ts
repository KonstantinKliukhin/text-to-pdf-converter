export type PdfHistoryItem = {
  id?: number;
  createdAt: string;
  data: Blob;
  text: string;
};

export type AddHistoryItemData = {
  blob: Blob;
  text: string;
};

export interface IPdfHistoryStorage {
  addHistoryItem: (data: AddHistoryItemData) => Promise<void>;
  getAllHistoryItems: () => Promise<PdfHistoryItem[]>;
  deleteHistoryItem: (id: number) => Promise<void>;
}
