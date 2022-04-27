import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HeaderNavItem from 'components/HeaderNavItem';
import { Router, MemoryRouter } from 'react-router-dom';

const navItem = { title: 'New Post', url: '/post/create' };

describe('Test HeaderNavItem', () => {
  it('Renders without error', () => {
    render(
      <MemoryRouter>
        <HeaderNavItem key={1} navItem={navItem} />
      </MemoryRouter>,
    );

    expect(screen.getByText(/New Post/i)).toBeInTheDocument();
  });

  it('Routes to correct page', () => {
    const history = createMemoryHistory();
    history.push = jest.fn();

    render(
      <Router location={history.location} navigator={history}>
        <HeaderNavItem key={1} navItem={navItem} />
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
