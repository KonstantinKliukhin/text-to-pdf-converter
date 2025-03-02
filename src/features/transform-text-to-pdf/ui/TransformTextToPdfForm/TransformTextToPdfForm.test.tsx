import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toast } from "sonner";

import { TransformTextToPdfForm } from "./TransformTextToPdfForm";

const mockApiRequest = jest.fn();

jest.mock("sonner");
jest.mock("../../api/services", () => ({
  transformTextToPdf: (...params: unknown[]) => mockApiRequest(...params),
}));

describe("TransformTextToPdfForm", () => {
  const mockOnSuccess = jest.fn();

  const getTextArea = () => screen.queryByTestId("TransformTextToPdfForm.textTextarea")!;
  const getTextError = () => screen.queryByTestId("TransformTextToPdfForm.textError");
  const getSubmitButton = () =>
    screen.queryByTestId("TransformTextToPdfForm.submitButton")!;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form with textarea and submit button", () => {
    render(<TransformTextToPdfForm onSuccess={mockOnSuccess} />);

    expect(getTextArea()).toBeInTheDocument();
    expect(getSubmitButton()).toBeInTheDocument();
  });

  it("shows validation error when submitting empty form", async () => {
    render(<TransformTextToPdfForm onSuccess={mockOnSuccess} />);

    fireEvent.click(getSubmitButton()!);

    await waitFor(() => {
      expect(getTextError()).toBeInTheDocument();
      expect(getTextError()?.textContent).toBe("Write at least 1 sybmol");
    });
  });

  it("shows validation error when text exceeds maximum length", async () => {
    render(<TransformTextToPdfForm onSuccess={mockOnSuccess} />);

    const longText = "a".repeat(15001);

    fireEvent.change(getTextArea(), { target: { value: longText } });

    fireEvent.click(getSubmitButton());

    await waitFor(() => {
      expect(getTextError()).toBeInTheDocument();
      expect(getTextError()?.textContent).toBe("Maximum text length is 15000 characters");
    });
  });

  it("successfully submits form with valid data", async () => {
    const mockBlob = new Blob(["test"], { type: "application/pdf" });
    mockApiRequest.mockResolvedValueOnce(mockBlob);

    render(<TransformTextToPdfForm onSuccess={mockOnSuccess} />);

    const testText = "Test text";
    await userEvent.type(getTextArea(), testText);

    fireEvent.click(getSubmitButton());

    await waitFor(() => {
      expect(mockApiRequest).toHaveBeenCalledWith({ text: testText });
      expect(mockOnSuccess).toHaveBeenCalledWith({
        blob: mockBlob,
        text: testText,
      });
    });
  });

  it("form resets after successfull submitting", async () => {
    const mockBlob = new Blob(["test"], { type: "application/pdf" });
    mockApiRequest.mockResolvedValueOnce(mockBlob);

    render(<TransformTextToPdfForm onSuccess={mockOnSuccess} />);

    const testText = "Test text";
    await userEvent.type(getTextArea(), testText);

    fireEvent.click(getSubmitButton());

    await waitFor(() => {
      expect(mockApiRequest).toHaveBeenCalledWith({ text: testText });
      expect(mockOnSuccess).toHaveBeenCalledWith({
        blob: mockBlob,
        text: testText,
      });
    });

    expect(getTextArea()).toHaveValue("");
  });

  it("shows error toast when API call fails", async () => {
    mockApiRequest.mockRejectedValueOnce(new Error("API Error"));

    render(<TransformTextToPdfForm onSuccess={mockOnSuccess} />);

    await userEvent.type(screen.getByRole("textbox"), "Test text");
    fireEvent.click(screen.getByRole("button", { name: /transform to pdf/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Unknown error occurred. Please contact support"
      );
    });
  });

  it("does not make API request when form is invalid", async () => {
    render(<TransformTextToPdfForm onSuccess={mockOnSuccess} />);

    fireEvent.click(getSubmitButton());

    await waitFor(() => {
      expect(getTextError()).toBeInTheDocument();
    });

    expect(mockApiRequest).not.toHaveBeenCalled();
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });
});
