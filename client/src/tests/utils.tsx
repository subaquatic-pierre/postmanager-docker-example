import { Router } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';

export const createTestRouter = (history) => {
  history.push = jest.fn();

  return ({ children, ...props }) => (
    <Router location={history.location} navigator={history} {...props}>
      {children}
    </Router>
  );
};

export const createTestApolloProvider = (mocks = []) => {
  return ({ children, ...props }) => (
    <MockedProvider mocks={mocks} addTypename={false}>
      {children}
    </MockedProvider>
  );
};

export const checkTextInContent = (
  text: string,
): ((content: string) => boolean) => {
  return (content) => {
    return content.includes(text);
  };
};

export const navCall = (pathname: string) => {
  return {
    hash: '',
    pathname,
    search: '',
  };
};
