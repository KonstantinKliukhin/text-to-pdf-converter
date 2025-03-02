import type Dexie from "dexie";

import { indexDB } from "@/shared/config/index-db";

import type { AddHistoryItemData, IPdfHistoryStorage, PdfHistoryItem } from "./types";

export class PdfHistoryIndexedDBStorage implements IPdfHistoryStorage {
  private storage = indexDB;
  private pdfs: Dexie.Table<PdfHistoryItem, number>;

  constructor() {
    this.storage.version(1).stores({
      pdfs: "++id, createdAt, data, text",
    });

    this.pdfs = this.storage.table("pdfs");
  }

  public async addHistoryItem({ blob, text }: AddHistoryItemData): Promise<void> {
    await this.pdfs.add({
      createdAt: new Date().toISOString(),
      data: blob,
      text,
    });
  }

  public async getAllHistoryItems(): Promise<PdfHistoryItem[]> {
    return await this.pdfs.toArray();
  }

  public async deleteHistoryItem(id: number): Promise<void> {
    await this.pdfs.delete(id);
  }
}

export const pdfHistoryIndexedDbStorage = new PdfHistoryIndexedDBStorage();
