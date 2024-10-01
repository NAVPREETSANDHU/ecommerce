import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmModal from "../ConfirmModal"; // Adjust the import based on your file structure

describe("ConfirmModal Component", () => {
  test("renders correctly with title and body", () => {
    render(
      <ConfirmModal title="Confirm Action" body="Are you sure?">
        {(handleShow) => <button onClick={handleShow}>Open Modal</button>}
      </ConfirmModal>
    );

    // Open the modal
    fireEvent.click(screen.getByText(/open modal/i));

    // Check modal title and body
    expect(screen.getByText(/confirm action/i)).toBeInTheDocument();
    expect(screen.getByText(/are you sure\?/i)).toBeInTheDocument();
  });

  test("calls handleConfirm on confirm", () => {
    const handleConfirm = jest.fn();
    render(
      <ConfirmModal
        title="Confirm Action"
        body="Are you sure?"
        handleConfirm={handleConfirm}
      >
        {(handleShow) => <button onClick={handleShow}>Open Modal</button>}
      </ConfirmModal>
    );

    // Open the modal
    fireEvent.click(screen.getByText(/open modal/i));

    // Click the Yes button
    fireEvent.click(screen.getByText(/yes/i));

    // Confirm that handleConfirm was called
    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });
});
