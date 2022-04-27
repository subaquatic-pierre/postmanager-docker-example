import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from 'components/Header';

describe('Test main Header', () => {
  it('Renders without error', () => {
    render(
      <Router>
        <Header />
      </Router>,
    );

    expect(screen.getByText(/PostManager GraphQL/i)).toBeInTheDocument();
  });

  it('Displays correct nav items', () => {
    render(
      <Router>
        <Header />
      </Router>,
    );

    expect(screen.getByText(/New Post/i)).toBeInTheDocument();
  });
});
