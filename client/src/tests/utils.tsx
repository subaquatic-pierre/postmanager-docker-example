import { Router } from 'react-router-dom';

export const createTestRouter = (history) => {
  history.push = jest.fn();

  return ({ children, ...props }) => (
    <Router location={history.location} navigator={history} {...props}>
      {children}
    </Router>
  );
};
