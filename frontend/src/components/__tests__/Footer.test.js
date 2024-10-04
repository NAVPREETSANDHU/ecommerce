import { render, screen } from '@testing-library/react';
import Footer from '../Footer'; 

describe('Footer Component', () => {
  test('renders footer with correct content', () => {
    render(<Footer />);

    // Check for the main title specifically using getByRole
    expect(screen.getByRole('heading', { level: 2, name: /bazaarlia/i })).toBeInTheDocument();

    // Check for the description
    expect(screen.getByText(/complete online shop/i)).toBeInTheDocument();

    // Check for navigation links
    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', '/about');
    expect(screen.getByRole('link', { name: /terms & conditions/i })).toHaveAttribute('href', '/t&c');

    // Check for contact information
    expect(screen.getByText(/info@bazaarlia.com/i)).toBeInTheDocument();
    expect(screen.getByText(/phone: \+61 0404111000/i)).toBeInTheDocument();
  });

  test('displays current year in copyright', () => {
    const { getByText } = render(<Footer />);
    const currentYear = new Date().getFullYear();
    
    // Check for copyright year
    expect(getByText(`Bazaarlia © ${currentYear}`)).toBeInTheDocument();
  });
});
