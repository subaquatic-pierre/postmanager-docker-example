import React from 'react';

import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import Box from '@mui/material/Box';

import createToolbarPlugin from '@draft-js-plugins/static-toolbar';
import CustomEditor from './CustomEditor';
import CustomToolbar from './CustomToolbar';
import { useTheme } from '@emotion/react';

interface Props {
  setContent: (data: any) => void;
  content?: any;
}

const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;
const plugins = [toolbarPlugin];

const TextEditor = ({ setContent, content }: Props): JSX.Element => {
  const theme = useTheme();
  const editorRef = React.useRef(null);
  const boxRef = React.useRef(null);

  const editorFocus = () => {
    editorRef.current.focus();
  };

  return (
    <Box
      onClick={editorFocus}
      ref={boxRef}
      sx={{
        '& .public-DraftEditor-content': {
          border: '1px solid lightGrey',
          boxSizing: 'border-box',
          cursor: ' text',
          padding: '12px',
          borderRadius: '5px',
          marginBottom: '2em',
          '&:hover': {
            border: '1px solid grey',
          },
          '&:focus': {
            border: '2px solid #1976d2',
            padding: '11px',
          },
          minHeight: '140px',
        },
      }}
    >
      <CustomToolbar Toolbar={Toolbar} />
      <CustomEditor
        setContent={setContent}
        content={content}
        editorRef={editorRef}
        plugins={plugins}
      />
    </Box>
  );
};

export default TextEditor;
