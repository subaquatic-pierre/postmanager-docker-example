import { render, screen } from '@testing-library/react';

import PostHeroImage from 'components/PostHeroImage';

describe('Test main PostHeroImage element', () => {
  it('Renders skeleton on loading', () => {
    render(<PostHeroImage loading={true} imageSrc="" title="imageTitle" />);

    // Check title in component
    expect(screen.getByTestId(/hero-image-skeleton/i)).toBeInTheDocument();
  });

  it('Renders image on not loading', () => {
    render(<PostHeroImage loading={false} imageSrc="" title="imageTitle" />);

    // Check title in component
    expect(
      screen.queryByTestId(/hero-image-skeleton/i),
    ).not.toBeInTheDocument();
    expect(screen.getByTestId(/hero-image/i)).toBeInTheDocument();
  });

  it('Renders image with correct background url', () => {
    const imageSrc = 'data:image/jpeg;base64,ivJGG9090fndn';
    render(
      <PostHeroImage loading={false} imageSrc={imageSrc} title="imageTitle" />,
    );

    const el = screen.getByTestId(/hero-image/i);
    expect(el).toHaveStyle(`background-image: url(${imageSrc})`);
  });

  it('Renders hidden image with correct title', () => {
    const imageTitle = 'coolTitle';
    render(
      <PostHeroImage loading={false} imageSrc="imageSrc" title={imageTitle} />,
    );

    const el = screen.getByTestId(/hidden-image/i);
    expect(el).toHaveAttribute('alt', imageTitle);
  });
});
