import React from 'react';

import { Editor } from 'react-draft-wysiwyg';
import {
  EditorState,
  convertFromRaw,
  convertToRaw,
  ContentState,
} from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import Box from '@mui/material/Box';

interface Props {
  setContent: (data: any) => void;
  content?: any;
}

const TextEditor = ({ setContent, content }: Props): JSX.Element => {
  let _editorState = EditorState.createEmpty();

  if (content !== undefined) {
    const _content = convertFromRaw(content);
    _editorState = EditorState.createWithContent(_content);
  }
  const [editorState, setEditorState] = React.useState(_editorState);

  const handleEditorChange = (event: any) => {
    // Update editor state
    setEditorState(event);

    // Update blocks on form data
    const content = editorState.getCurrentContent();
    const blocks = convertToRaw(content);
    setContent(blocks);
  };

  React.useEffect(() => {}, [editorState]);

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
        onEditorStateChange={handleEditorChange}
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
