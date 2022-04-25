import React from 'react';

import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface Props {
  metaData: PostMetaData;
  content: any;
}

const renderComponent = (
  type: string,
  content: string,
  index: number,
): JSX.Element => {
  switch (type) {
    case 'header':
      return (
        <Typography key={index} sx={{ mb: 2 }} variant="h5">
          {content}
        </Typography>
      );
    case 'paragraph':
      return (
        <Typography key={index} sx={{ mb: 1 }} variant="body1">
          {content}
        </Typography>
      );

    default:
      return (
        <Typography key={index} variant="body1">
          {content}
        </Typography>
      );
  }
};

const PostContent = ({ metaData, content }: Props) => {
  const [blocks, setBlocks] = React.useState([]);

  React.useEffect(() => {
    if (content.blocks !== undefined) {
      setBlocks(content.blocks);
    }
  }, [content]);

  return (
    <Box sx={{ mt: 2 }}>
      {blocks.map((block, i) => renderComponent(block.type, block.text, i))}
    </Box>
  );
};

export default PostContent;
