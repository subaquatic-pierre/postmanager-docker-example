import React from 'react';

import Editor from '@draft-js-plugins/editor';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';

interface Props {
  setContent: (data: any) => void;
  editorRef: any;
  content: string;
  plugins?: any;
}

const CustomEditor = ({ setContent, editorRef, content, plugins }: Props) => {
  let _editorState = EditorState.createEmpty();

  if (content !== '') {
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
  return (
    <Editor
      editorState={editorState}
      onChange={handleEditorChange}
      ref={editorRef}
      plugins={plugins}
    />
  );
};

export default CustomEditor;
