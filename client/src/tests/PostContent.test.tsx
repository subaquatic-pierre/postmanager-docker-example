import { render, screen } from '@testing-library/react';

import PostContent from 'components/PostContent';

interface Props {
  metaData: PostMetaData;
  content: any;
}

const metaData: PostMetaData = {
  title: 'Cool post',
  tags: 'cool tags',
  id: '1',
  snippet: 'Cool stuff with...',
};

const content = {
  blocks: [
    {
      type: 'header',
      text: 'header text',
    },
    {
      type: 'paragraph',
      text: 'paragraph text',
    },
    {
      type: 'unstyled',
      text: 'unstyled text',
    },
  ],
};

describe('Test main PostContent', () => {
  it('Renders no blocks on empty content', () => {
    render(<PostContent content={[]} />);

    expect(screen.queryByTestId(/content-default/i)).not.toBeInTheDocument();
  });

  it('Renders correct components for content blocks', () => {
    render(<PostContent content={content} />);

    expect(screen.queryByTestId(/content-h5/i)).toHaveTextContent(
      'header text',
    );
    expect(screen.queryByTestId(/content-body1/i)).toHaveTextContent(
      'paragraph text',
    );
    expect(screen.queryByTestId(/content-default/i)).toHaveTextContent(
      'unstyled text',
    );
  });
});
