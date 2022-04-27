import { render, screen } from '@testing-library/react';
import { checkTextInContent } from 'tests/utils';

import Footer from 'components/Footer';

describe('Test main Footer', () => {
  it('Renders without error', () => {
    render(<Footer />);

    expect(screen.getByText(/PostManager GraphQL/i)).toBeInTheDocument();
  });

  it('Renders date', () => {
    render(<Footer />);

    const date = new Date().getFullYear().toString();

    expect(screen.getByText(checkTextInContent(date))).toBeInTheDocument();
  });
});
