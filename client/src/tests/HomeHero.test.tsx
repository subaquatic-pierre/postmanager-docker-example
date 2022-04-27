import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { createTestRouter } from 'tests/utils';

import HomeHero from 'components/HomeHero';

describe('Test main HomeHero', () => {
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
        <HomeHero />
      </Router>,
    );

    expect(screen.getAllByText(/PostManager/i)[0]).toBeInTheDocument();
  });

  it('Routes to create post page', () => {
    render(
      <Router>
        <HomeHero />
      </Router>,
    );

    fireEvent.click(screen.getByText(/New Post/i));

    expect(history.push).toHaveBeenCalledWith(
      {
        hash: '',
        pathname: '/post/create',
        search: '',
      },
      undefined,
    );
  });
});
