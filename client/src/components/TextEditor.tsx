import React from 'react';

import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import Box from '@mui/material/Box';

interface Props {
  setContent: (data: any) => void;
}

const TextEditor = ({ setContent }: Props): JSX.Element => {
  let _contentState = ContentState.createFromText('Sample content state');
  const raw = convertToRaw(_contentState);
  const [contentState, setContentState] = React.useState(raw);
  // const [editorState, setEditorState] = React.useState(
  //   EditorState.createEmpty(),
  // );

  // const handleEditChange = (event: any) => {
  //   setEditorState(event);
  // };

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
        defaultContentState={contentState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={setContentState}
        toolbar={{
          inline: { inDropdown: true },
          list: { inDropdown: true },
          textAlign: { inDropdown: true },
          link: { inDropdown: true },
          history: { inDropdown: true },
        }}
      />
    </Box>
  );
};

export default TextEditor;
