import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import CreatePostMeta from 'components/CreatePostMeta';

export const setHookState = (newState: {}) =>
  jest.fn().mockImplementation((state: {}) => [newState, (newState: {}) => {}]);

describe('Test main CreatePostMeta element', () => {
  it('Renders input elements', () => {
    const data = {
      title: 'cool title',
      tags: 'cool tags',
    };
    render(<CreatePostMeta data={data} setFormData={setHookState} />);

    // Render title input
    expect(screen.getByDisplayValue(data.title)).toBeInTheDocument();

    // Render tags input
    expect(screen.getByDisplayValue(data.tags)).toBeInTheDocument();

    // Renders form
    expect(screen.getByTestId(/create-meta-form/i)).toBeInTheDocument();
  });

  it('Update state called on input change', async () => {
    const data = {
      title: 'cool title',
      tags: 'cool tags',
    };
    const mockUpdate = jest.fn();

    render(<CreatePostMeta data={data} setFormData={mockUpdate} />);

    // Render title input
    const titleInput = screen.getByDisplayValue(data.title);
    const tagInput = screen.getByDisplayValue(data.tags);

    fireEvent.change(titleInput, { target: { value: 'Cool title' } });
    fireEvent.change(tagInput, { target: { value: 'tags' } });

    // Render tags input
    expect(mockUpdate).toHaveBeenCalledTimes(2);
  });
});
