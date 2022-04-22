import React from 'react';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import Page from 'components/Page';

interface PostData {
  title: string;
  tags: string;
  coverPhoto: string | ArrayBuffer;
  content: any;
}

const defaultValues: PostData = {
  title: '',
  tags: '',
  coverPhoto: '',
  content: '',
};

const CreatePost = (): JSX.Element => {
  const hiddenFileInput = React.useRef(null);
  const [data, setData] = React.useState(defaultValues);

  const handleTextInputChange = (e: any) => {
    setData((oldData) => ({
      ...oldData,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmitClick = () => {
    console.log(data);
  };

  const handleUploadClick = () => {
    hiddenFileInput.current.click();
  };
  const handleFileInputChange = (e: any) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.addEventListener(
      'load',
      () => {
        setData((oldData) => ({
          ...oldData,
          coverPhoto: reader.result,
        }));
      },
      false,
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <Page>
      {data.coverPhoto ? (
        <Paper
          sx={{
            position: 'relative',
            backgroundColor: 'grey.800',
            color: '#fff',
            mb: 4,
            backgroundSize: 'cover',
            height: '400px',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url(${data.coverPhoto})`,
          }}
        ></Paper>
      ) : (
        <Skeleton animation="wave" variant="rectangular" height="400px" />
      )}

      <Grid container spacing={4} sx={{ mt: 1, mb: 10 }}>
        <Grid item xs={12} sm={6}>
          <Box component="form" noValidate autoComplete="off">
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
        </Grid>
        <Grid
          display="flex"
          justifyContent="flex-end"
          alignItems="flex-start"
          item
          xs={12}
          sm={6}
        >
          <Button
            onClick={handleUploadClick}
            sx={{ mr: 1 }}
            variant="contained"
          >
            Upload Photo
          </Button>
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={handleFileInputChange}
            style={{ display: 'none' }}
          />
        </Grid>
      </Grid>
      <Box sx={{ minHeight: '30vh' }}>Draft JS</Box>
      <Box sx={{ mb: 4 }} display="flex" justifyContent="flex-end">
        <Button onClick={handleSubmitClick} sx={{ mr: 1 }} variant="contained">
          Submit
        </Button>
      </Box>
    </Page>
  );
};

export default CreatePost;
