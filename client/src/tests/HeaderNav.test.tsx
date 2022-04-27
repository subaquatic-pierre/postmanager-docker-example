import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HeaderNav from 'components/HeaderNav';
import { Router, MemoryRouter } from 'react-router-dom';

const navList: [NavItem] = [{ title: 'Login', url: '/login' }];

describe('Test Header Nav', () => {
  it('Renders without error', () => {
    render(
      <MemoryRouter>
        <HeaderNav navList={navList} />
      </MemoryRouter>,
    );

    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  it('Routes to correct page', () => {
    const history = createMemoryHistory();
    history.push = jest.fn();

    render(
      <Router location={history.location} navigator={history}>
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
