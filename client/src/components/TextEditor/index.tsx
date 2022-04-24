import React from 'react';
import '@draft-js-plugins/static-toolbar/lib/plugin.css';
import Box from '@mui/material/Box';
import createToolbarPlugin from '@draft-js-plugins/static-toolbar';
import CustomEditor from './CustomEditor';
import CustomToolbar from './CustomToolbar';

interface Props {
  setContent: (data: any) => void;
  content?: any;
}

const toolbarPlugin = createToolbarPlugin();
const { Toolbar } = toolbarPlugin;
const plugins = [toolbarPlugin];

const TextEditor = ({ setContent, content }: Props): JSX.Element => {
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
        boxSizing: 'border-box',
        border: '1px solid lightGrey',
        cursor: ' text',
        padding: 2,
        borderRadius: '5px',
        marginBottom: '2em',
        '&:hover': {
          border: '1px solid grey',
        },
        background: '#fefefe',
        '& .public-DraftEditor-content': {
          minHeight: '140px',
        },
      }}
    >
      <CustomEditor
        setContent={setContent}
        content={content}
        editorRef={editorRef}
        plugins={plugins}
      />
      <CustomToolbar Toolbar={Toolbar} />
    </Box>
  );
};

export default TextEditor;
