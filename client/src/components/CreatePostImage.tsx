import React from 'react';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

interface Props {
  setFormData: (event: any) => void;
  formData: any;
}

const CreatePostImage = ({ formData, setFormData }: Props) => {
  const hiddenFileInput = React.useRef(null);

  const setImageData = (dataUrl: any) => {
    setFormData((oldData) => ({
      ...oldData,
      mediaData: [
        ...oldData.mediaData,
        {
          mediaName: 'cover_photo',
          dataUrl: dataUrl,
        },
      ],
    }));
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
        setImageData(reader.result);
      },
      false,
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  return (
    <Grid
      display="flex"
      justifyContent="flex-end"
      alignItems="flex-start"
      item
      xs={12}
      sm={6}
    >
      <Button onClick={handleUploadClick} sx={{ mr: 1 }} variant="contained">
        Upload Photo
      </Button>
      <input
        type="file"
        ref={hiddenFileInput}
        onChange={handleFileInputChange}
        style={{ display: 'none' }}
      />
    </Grid>
  );
};

export default CreatePostImage;
