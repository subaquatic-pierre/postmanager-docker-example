import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { createTestRouter } from 'tests/utils';

import HeaderNav from 'components/HeaderNav';

const navList: [NavItem] = [{ title: 'Login', url: '/login' }];

describe('Test Header Nav', () => {
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
        <HeaderNav navList={navList} />
      </Router>,
    );

    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  it('Routes to correct page', () => {
    render(
      <Router>
        <HeaderNav navList={navList} />
      </Router>,
    );

    fireEvent.click(screen.getByText(/Login/i));

    expect(history.push).toHaveBeenCalledWith(
      {
        hash: '',
        pathname: '/login',
        search: '',
      },
      undefined,
    );
  });
});
