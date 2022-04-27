import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { createMemoryHistory } from 'history';
import { createTestRouter } from 'tests/utils';

import { ALL_POST_META_DATA } from 'queries';
import PostGrid from 'components/PostGrid';

const buildPostMeta = (postId: string) => {
  return {
    title: `Cool post ${postId}`,
    tags: `cool tags post${postId}`,
    id: postId,
    snippet: 'Cool stuff with...',
  };
};

describe('Test main PostGrid element', () => {
  let Router;
  let history;

  beforeEach(() => {
    //   Setup history
    history = createMemoryHistory();
    const TestRouter = createTestRouter(history);
    Router = TestRouter;
  });

  it('Renders renders loading', () => {
    render(
      <MockedProvider>
        <Router>
          <PostGrid />
        </Router>
      </MockedProvider>,
    );

    // Check title in component
    expect(screen.getByText(/Loading .../i)).toBeInTheDocument();
  });

  it('Renders renders error', async () => {
    const mockData = {
      request: {
        query: ALL_POST_META_DATA,
      },

      error: new Error('Error getting posts'),
    };

    render(
      <MockedProvider mocks={[mockData]}>
        <Router>
          <PostGrid />
        </Router>
      </MockedProvider>,
    );

    await waitFor(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(screen.getByText(/Error/i)).toBeInTheDocument();
    });
  });

  it('Renders renders grid items', async () => {
    const mockData = {
      request: {
        query: ALL_POST_META_DATA,
      },

      result: {
        data: {
          allPostMetaData: [
            buildPostMeta('1'),
            buildPostMeta('2'),
            buildPostMeta('3'),
          ],
        },
      },
    };

    render(
      <MockedProvider mocks={[mockData]}>
        <Router>
          <PostGrid />
        </Router>
      </MockedProvider>,
    );

    await waitFor(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(screen.getAllByTestId(/main-grid-item/i).length).toBe(3);
    });
  });
});
