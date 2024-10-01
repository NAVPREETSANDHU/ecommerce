import { render, screen } from "@testing-library/react";
import Rating from "../Rating";

describe("Rating Component", () => {
  test("renders five empty stars for value 0", () => {
    render(<Rating value={0} />);
    const stars = screen.getAllByLabelText(/empty star/i); // Query by aria-label
    expect(stars).toHaveLength(5);
  });

  test("renders two full stars and one half star for value 2.5", () => {
    render(<Rating value={2.5} />);
    const fullStars = screen.getAllByLabelText(/full star/i);
    const halfStars = screen.getAllByLabelText(/half star/i);
    const emptyStars = screen.getAllByLabelText(/empty star/i);

    expect(fullStars).toHaveLength(2);
    expect(halfStars).toHaveLength(1);
    expect(emptyStars).toHaveLength(2);
  });

  test("renders three full stars for value 3", () => {
    render(<Rating value={3} />);
    const fullStars = screen.getAllByLabelText(/full star/i);
    const emptyStars = screen.getAllByLabelText(/empty star/i);

    expect(fullStars).toHaveLength(3);
    expect(emptyStars).toHaveLength(2);
  });

  test("renders five full stars for value 5", () => {
    render(<Rating value={5} />);
    const fullStars = screen.getAllByLabelText(/full star/i);

    expect(fullStars).toHaveLength(5);
  });

  test("renders correct text when provided", () => {
    render(<Rating value={4} text="Great!" />);
    expect(screen.getByText(/Great!/i)).toBeInTheDocument();
  });
});
