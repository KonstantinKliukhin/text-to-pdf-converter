import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { HomePageContent } from "./HomePageContent";

const mockAddHistoryItem = jest.fn();

jest.mock("@/entities/pdf-history", () => ({
  pdfHistoryStorage: {
    addHistoryItem: mockAddHistoryItem,
  },
}));

jest.mock("@/shared/ui/PdfView", () => ({
  PdfView: ({ url }: { url: string }) => <div data-testid="pdf-viewer" data-url={url} />,
}));


jest.mock("sonner");

const mockCreateObjectURL = jest.fn();
URL.createObjectURL = mockCreateObjectURL;

describe("HomePageContent", () => {
  const mockMutateAsync = jest.fn();

  const getTextArea = () => screen.queryByTestId("TransformTextToPdfForm.textTextarea")!;
  const getSubmitButton = () =>
    screen.queryByTestId("TransformTextToPdfForm.submitButton")!;
  const getShowPdfBlock = () => screen.queryByTestId("HomePageContent.showPdfBlock");

  beforeEach(() => {
    jest.clearAllMocks();
    mockCreateObjectURL.mockReturnValue("mock-pdf-url");
  });

  it("renders TransformTextToPdfForm initially without PDF viewer", () => {
    render(<HomePageContent />);

    expect(getTextArea()).toBeInTheDocument();
    expect(getShowPdfBlock()).not.toBeInTheDocument();
  });

  it("shows PDF viewer and stores history after successful PDF transformation", async () => {
    const mockBlob = new Blob(["test"], { type: "application/pdf" });
    mockMutateAsync.mockResolvedValueOnce(mockBlob);

    render(<HomePageContent />);

    const testText = "Test PDF content";
    await userEvent.type(getTextArea(), testText);

    await userEvent.click(getSubmitButton());

    await waitFor(() => {
      expect(getShowPdfBlock()).toBeInTheDocument();

      expect(mockCreateObjectURL).toHaveBeenCalledWith(mockBlob);

      expect(mockAddHistoryItem).toHaveBeenCalledWith({
        blob: mockBlob,
        text: testText,
      });
    });
  });

  it("creates unique URLs for different PDFs", async () => {
    const mockBlob1 = new Blob(["test1"], { type: "application/pdf" });
    const mockBlob2 = new Blob(["test2"], { type: "application/pdf" });
    mockMutateAsync.mockResolvedValueOnce(mockBlob1).mockResolvedValueOnce(mockBlob2);

    mockCreateObjectURL
      .mockReturnValueOnce("mock-pdf-url-1")
      .mockReturnValueOnce("mock-pdf-url-2");

    render(<HomePageContent />);

    // First PDF transformation
    await userEvent.type(getTextArea(), "First PDF");
    await userEvent.click(getSubmitButton());

    await waitFor(() => {
      expect(mockCreateObjectURL).toHaveBeenCalledWith(mockBlob1);
      expect(getShowPdfBlock()).toBeInTheDocument();
    });

    // Second PDF transformation
    await userEvent.type(getTextArea(), "Second PDF");
    await userEvent.click(getSubmitButton());

    await waitFor(() => {
      expect(mockCreateObjectURL).toHaveBeenCalledWith(mockBlob2);
      expect(mockCreateObjectURL).toHaveBeenCalledTimes(2);
    });
  });
});
