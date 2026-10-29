import { render, screen } from '@testing-library/react';
import { Footer } from '@/components/Footer';

describe('Footer', () => {
  it('renders the copyright text', () => {
    render(<Footer />);
    expect(screen.getByText(/© 2025 Boatrace Motivation Viz/i)).toBeInTheDocument();
  });
});
