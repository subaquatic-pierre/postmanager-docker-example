import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';

import { GET_MEDIA } from 'queries';

import PostHero from 'components/PostHero';

const postId = '1';
const title = 'coolTitle';

describe('Test main PostHero element', () => {
  it('Renders skeleton on loading', () => {
    render(
      <MockedProvider>
        <PostHero title={title} postId={postId} />
      </MockedProvider>,
    );

    // Check title in component
    expect(screen.getByTestId(/hero-image-skeleton/i)).toBeInTheDocument();
  });

  it('Renders image with correct source on completed request call', async () => {
    const imageMock = {
      request: {
        query: GET_MEDIA,
        variables: {
          postId,
          mediaName: 'cover_photo',
        },
      },
      result: {
        data: {
          mediaData: { dataSrc: 'imageSrc' },
        },
      },
    };

    render(
      <MockedProvider mocks={[imageMock]}>
        <PostHero title={title} postId={postId} />
      </MockedProvider>,
    );

    // Check title in component
    await waitFor(() => {
      expect(screen.getByTestId(/hero-image/i)).toHaveStyle(
        'background-image: url(imageSrc)',
      );
    });
  });

  it('Does not render image if error in request', async () => {
    const imageMock = {
      request: {
        query: GET_MEDIA,
        variables: {
          postId,
          mediaName: 'cover_photo',
        },
      },
      error: new Error('There was an error fetching image'),
    };

    render(
      <MockedProvider mocks={[imageMock]}>
        <PostHero title={title} postId={postId} />
      </MockedProvider>,
    );

    // Check title in component
    await waitFor(() => {
      // Check title in component
      expect(screen.getByTestId(/hero-image-skeleton/i)).toBeInTheDocument();
    });
  });
});
