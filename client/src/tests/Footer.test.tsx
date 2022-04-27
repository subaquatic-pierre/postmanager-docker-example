import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from 'components/Footer';

describe('Test main Footer', () => {
  it('Renders without error', () => {
    render(
      <Router>
        <Footer />
      </Router>,
    );

    expect(screen.getByText(/PostManager GraphQL/i)).toBeInTheDocument();
  });

  it('Renders date', () => {
    render(
      <Router>
        <Footer />
      </Router>,
    );

    const getDate = (content) => {
      const date = new Date().getFullYear().toString();
      return content.includes(date);
    };

    expect(screen.getByText(getDate)).toBeInTheDocument();
  });
});
