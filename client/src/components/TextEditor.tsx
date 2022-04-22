import React from 'react';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

interface Props {
  setContent: (data: any) => void;
}

const TextEditor = ({ setContent }: Props): JSX.Element => {
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty(),
  );

  return (
    <Box
      sx={{
        border: '1px solid lightGrey',
        minHeight: '30vh',
        borderRadius: 2,
        mb: 3,
        p: 1,
      }}
    >
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={setEditorState}
      />
    </Box>
  );
};

export default TextEditor;
