import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

interface Props {
  handleInputChange: (event: any) => void;
  data: any;
}

const CreatePostMeta = ({ handleInputChange, data }: Props): JSX.Element => {
  return (
    <Box component="form" noValidate autoComplete="off">
      <Stack spacing={2}>
        <TextField
          onChange={handleInputChange}
          value={data.title}
          fullWidth
          id="title"
          label="Title"
          variant="outlined"
        />
        <TextField
          onChange={handleInputChange}
          value={data.tags}
          id="tags"
          label="Tags"
          variant="outlined"
        />
      </Stack>
    </Box>
  );
};

export default CreatePostMeta;
