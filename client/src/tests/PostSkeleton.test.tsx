import { render, screen } from '@testing-library/react';
import PostContentSkeleton from 'components/PostContentSkeleton';

describe('Test main PostContentSkeleton', () => {
  it('Renders without error', () => {
    render(<PostContentSkeleton />);

    expect(screen.getAllByTestId(/skeleton-text/i)).not.toBeNull();
  });
});
