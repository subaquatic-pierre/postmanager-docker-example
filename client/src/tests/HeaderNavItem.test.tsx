import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { createTestRouter, navCall } from 'tests/utils';

import HeaderNavItem from 'components/HeaderNavItem';

const navItem = { title: 'New Post', url: '/post/create' };

describe('Test HeaderNavItem', () => {
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
        <HeaderNavItem key={1} navItem={navItem} />
      </Router>,
    );

    expect(screen.getByText(/New Post/i)).toBeInTheDocument();
  });

  it('Routes to correct page', () => {
    render(
      <Router>
        <HeaderNavItem key={1} navItem={navItem} />
      </Router>,
    );

    fireEvent.click(screen.getByText(/New Post/i));

    expect(history.push).toHaveBeenCalledWith(
      navCall('/post/create'),
      undefined,
    );
  });
});
