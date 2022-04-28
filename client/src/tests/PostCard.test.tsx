import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GraphQLError } from 'graphql';

import { createMemoryHistory } from 'history';
import { createTestRouter, checkTextInContent, navCall } from 'tests/utils';

import { DELETE_POST } from 'queries';
import PostCard from 'components/PostCard';

const metaData: PostMetaData = {
  title: 'Cool post',
  tags: 'cool tags',
  id: '1',
  snippet: 'Cool stuff with...',
};

describe('Test main PostCard element', () => {
  let Router;
  let history;

  beforeEach(() => {
    //   Setup history
    history = createMemoryHistory();
    const TestRouter = createTestRouter(history);
    Router = TestRouter;
  });

  it('Renders post meta data', () => {
    render(
      <MockedProvider>
        <Router>
          <PostCard data={metaData} />
        </Router>
      </MockedProvider>,
    );

    // Check title in component
    expect(screen.getByText(metaData.title)).toBeInTheDocument();

    // Check snippet in document
    expect(screen.getByText(metaData.snippet)).toBeInTheDocument();
  });

  it('Navigates to post page on view button click', () => {
    render(
      <MockedProvider>
        <Router>
          <PostCard data={metaData} />
        </Router>
      </MockedProvider>,
    );

    fireEvent.click(screen.getByText(/View/i));
    expect(history.push).toHaveBeenCalledWith(
      navCall(`/post/${metaData.id}`),
      undefined,
    );
  });

  it('Navigates to edit page on edit button click', () => {
    render(
      <MockedProvider>
        <Router>
          <PostCard data={metaData} />
        </Router>
      </MockedProvider>,
    );

    fireEvent.click(screen.getByText(/Edit/i));
    expect(history.push).toHaveBeenCalledWith(
      navCall(`/post/${metaData.id}/edit`),
      undefined,
    );
  });

  it('Renders error on delete mutation error', async () => {
    const spy = jest.spyOn(global.console, 'log').mockImplementation();

    const deleteMockError = {
      request: {
        query: DELETE_POST,
        variables: {
          postId: metaData.id,
        },
      },
      error: new Error('There was an error deleting the post'),
    };
    render(
      <MockedProvider mocks={[deleteMockError]}>
        <Router>
          <PostCard data={metaData} />
        </Router>
      </MockedProvider>,
    );

    fireEvent.click(screen.getByText(/Delete/i));

    // Check error is displayed
    await waitFor(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(
        screen.getByText(/There was an error deleting the post/i),
      ).toBeInTheDocument();
    });

    // Check console log on error
    await waitFor(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  it('Navigates to index page with refresh post on state', async () => {
    const deleteMock = {
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
    };

    render(
      <MockedProvider mocks={[deleteMock]}>
        <Router>
          <PostCard data={metaData} />
        </Router>
      </MockedProvider>,
    );

    fireEvent.click(screen.getByText(/Delete/i));

    await waitFor(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(history.push).toHaveBeenCalledWith(navCall('/'), {
        refetchPosts: true,
      });
    });
  });
});
