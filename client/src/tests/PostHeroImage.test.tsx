import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GraphQLError } from 'graphql';

import { createMemoryHistory } from 'history';
import { createTestRouter, checkTextInContent, navCall } from 'tests/utils';

import { DELETE_POST } from 'queries';
import PostHeroImage from 'components/PostHeroImage';

describe('Test main PostHeroImage element', () => {
  let Router;
  let history;

  beforeEach(() => {
    //   Setup history
    history = createMemoryHistory();
    const TestRouter = createTestRouter(history);
    Router = TestRouter;
  });

  it('Renders skeleton on loading', () => {
    render(
      <MockedProvider>
        <Router>
          <PostHeroImage loading={true} imageSrc="" title="imageTitle" />
        </Router>
      </MockedProvider>,
    );

    // Check title in component
    expect(screen.getByTestId(/hero-image-skeleton/i)).toBeInTheDocument();
  });

  it('Renders image on not loading', () => {
    render(
      <MockedProvider>
        <Router>
          <PostHeroImage loading={false} imageSrc="" title="imageTitle" />
        </Router>
      </MockedProvider>,
    );

    // Check title in component
    expect(
      screen.queryByTestId(/hero-image-skeleton/i),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId(/hero-image/i)).toBeInTheDocument();
  });

  it('Renders image with correct background url', () => {
    const imageSrc = 'data:image/jpeg;base64,ivJGG9090fndn';
    render(
      <MockedProvider>
        <Router>
          <PostHeroImage
            loading={false}
            imageSrc={imageSrc}
            title="imageTitle"
          />
        </Router>
      </MockedProvider>,
    );

    const el = screen.getByTestId(/hero-image/i);
    expect(el).toHaveStyle(`background-image: url(${imageSrc})`);
  });

  it('Renders hidden image with correct title', () => {
    const imageTitle = 'coolTitle';
    render(
      <MockedProvider>
        <Router>
          <PostHeroImage
            loading={false}
            imageSrc="imageSrc"
            title={imageTitle}
          />
        </Router>
      </MockedProvider>,
    );

    const el = screen.getByTestId(/hidden-image/i);
    expect(el).toHaveAttribute('alt', imageTitle);
  });
});
