import { render, screen } from '@testing-library/react';
import Footer from 'components/Footer';

describe('Test main Footer', () => {
  it('Renders without error', () => {
    render(<Footer />);

    expect(screen.getByText(/PostManager GraphQL/i)).toBeInTheDocument();
  });

  it('Renders date', () => {
    render(<Footer />);

    const getDate = (content) => {
      const date = new Date().getFullYear().toString();
      return content.includes(date);
    };

    expect(screen.getByText(getDate)).toBeInTheDocument();
  });
});
