import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GraphQLError } from 'graphql';

import { createMemoryHistory } from 'history';
import { createTestRouter, checkTextInContent, navCall } from 'tests/utils';

import { DELETE_POST } from 'queries';
import PostMetaData from 'components/PostMetaData';

const metaData: PostMetaData = {
  title: 'Cool post',
  tags: 'cool tags',
  id: '1',
  snippet: 'Cool stuff with...',
};

describe('Test main PostMetaData element', () => {
  let Router;
  let history;

  beforeEach(() => {
    //   Setup history
    history = createMemoryHistory();
    const TestRouter = createTestRouter(history);
    Router = TestRouter;
  });

  it('Renders title and tags', () => {
    render(
      <MockedProvider>
        <Router>
          <PostMetaData metaData={metaData} />
        </Router>
      </MockedProvider>,
    );

    // Check title in component
    expect(
      screen.getByText(checkTextInContent(metaData.title)),
    ).toBeInTheDocument();

    // Check tags in component
    expect(
      screen.getByText(checkTextInContent(metaData.tags)),
    ).toBeInTheDocument();
  });

  it('Navigates to edit page on edit button click', () => {
    render(
      <MockedProvider>
        <Router>
          <PostMetaData metaData={metaData} />
        </Router>
      </MockedProvider>,
    );

    fireEvent.click(screen.getByText(/Edit/i));
    expect(history.push).toHaveBeenCalledWith(
      navCall(`/post/${metaData.id}/edit`),
      undefined,
    );
  });

  it('Deletes post on delete button click', async () => {
    const mocks = [
      {
        request: {
          query: DELETE_POST,
          variables: {
            postId: metaData.id,
          },
        },

        result: {
          data: {
            deletePost: {
              deleted: true,
              postId: metaData.id,
            },
          },
        },
      },
    ];

    render(
      <MockedProvider mocks={mocks}>
        <Router>
          <PostMetaData metaData={metaData} />
        </Router>
      </MockedProvider>,
    );

    fireEvent.click(screen.getByText(/Delete/i));

    await waitFor(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(history.push).toHaveBeenCalledWith(
        {
          hash: '',
          pathname: '/',
          search: '',
        },
        { refetchPosts: true },
      );
    });
  });

  it('Deletes displays error on delete error', async () => {
    const spy = jest.spyOn(global.console, 'log').mockImplementation();

    const mocks = [
      {
        request: {
          query: DELETE_POST,
          variables: {
            postId: metaData.id,
          },
        },
        result: {
          errors: [new GraphQLError('Error!')],
        },
      },
    ];

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Router>
          <PostMetaData metaData={metaData} />
        </Router>
      </MockedProvider>,
    );

    fireEvent.click(screen.getByText(/Delete/i));

    await waitFor(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(screen.getByTestId(/error-display/i)).toBeInTheDocument();
    });
    expect(spy).toHaveBeenCalled();
  });
});
