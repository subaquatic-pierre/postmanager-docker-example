import React from 'react';

import Editor from '@draft-js-plugins/editor';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';

interface Props {
  setTextEditorContent: (data: any) => void;
  editorRef: any;
  content: string;
  plugins?: any;
}

const CustomEditor = ({
  setTextEditorContent,
  editorRef,
  content,
  plugins,
}: Props) => {
  // let _editorState = EditorState.createEmpty();

  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty(),
  );

  const handleEditorChange = (event: any) => {
    // Update editor state
    setEditorState(event);

    // Update blocks on form data
    const _content = editorState.getCurrentContent();
    const content = convertToRaw(_content);
    setTextEditorContent(content);
  };

  React.useEffect(() => {
    if (content !== '') {
      const _content = convertFromRaw(content);
      setEditorState(EditorState.createWithContent(_content));
    }
  }, [content]);

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
