import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Link from 'components/Link';

it('Renders without error', () => {
  render(
    <Router>
      <Link to="/home">
        <div>Home</div>
      </Link>
    </Router>,
  );

  expect(screen.getByText('Home')).toBeInTheDocument();
});
