import React from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

interface Props {
  setFormData: (event: any) => void;
  data: any;
}

const CreatePostMeta = ({ setFormData, data }: Props): JSX.Element => {
  const handleTextInputChange = (e: any) => {
    setFormData((oldData) => ({
      ...oldData,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <Box
      component="form"
      data-testid="create-meta-form"
      noValidate
      autoComplete="off"
    >
      <Stack spacing={2}>
        <TextField
          onChange={handleTextInputChange}
          value={data.title}
          fullWidth
          id="title"
          label="Title"
          variant="outlined"
        />
        <TextField
          onChange={handleTextInputChange}
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
