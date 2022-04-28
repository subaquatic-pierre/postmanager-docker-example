import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { checkTextInContent } from 'tests/utils';

import { GET_MEDIA } from 'queries';
import PostCardImage from 'components/PostCardImage';

describe('Test main PostCardImage element', () => {
  const postId = '1';
  const mediaName = 'cover_photo';

  it('Renders skeleton if loading', () => {
    render(
      <MockedProvider>
        <PostCardImage postId={postId} mediaName={mediaName} />
      </MockedProvider>,
    );

    // Check title in component
    expect(screen.getByTestId(/card-image-loading/i)).toBeInTheDocument();
  });

  it('Renders error', async () => {
    const mediaMock = {
      request: {
        query: GET_MEDIA,
        variables: {
          postId,
          mediaName,
        },
      },
      error: new Error('There was an error'),
    };
    render(
      <MockedProvider mocks={[mediaMock]}>
        <PostCardImage postId={postId} mediaName={mediaName} />
      </MockedProvider>,
    );

    // Check check image exists
    await waitFor(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(screen.getByText(/There was an error/i)).toBeInTheDocument();
    });
  });

  it('Renders image and alt tag', async () => {
    const mediaMock = {
      request: {
        query: GET_MEDIA,
        variables: {
          postId,
          mediaName,
        },
      },
      result: {
        data: {
          mediaData: { dataSrc: 'imageSrc' },
        },
      },
    };

    render(
      <MockedProvider mocks={[mediaMock]}>
        <PostCardImage postId={postId} mediaName={mediaName} />
      </MockedProvider>,
    );

    // Check check image exists
    await waitFor(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(screen.getByTestId(/card-image/i)).toBeInTheDocument();
    });

    // Check alt name
    await waitFor(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
      expect(screen.getByTestId(/card-image/i)).toHaveAttribute(
        'alt',
        'random',
      );
    });
  });
});
