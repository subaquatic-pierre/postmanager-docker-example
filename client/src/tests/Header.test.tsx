import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { createTestRouter } from 'tests/utils';

import Header from 'components/Header';

describe('Test main Header', () => {
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
