import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { createTestRouter } from 'tests/utils';

import Link from 'components/Link';

describe('Test main custom link element', () => {
  let Router;
  let history;

  beforeEach(() => {
    history = createMemoryHistory();
    const TestRouter = createTestRouter(history);
    Router = TestRouter;
  });

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
});
