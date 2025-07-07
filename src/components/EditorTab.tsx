// src/components/EditorTab.tsx
import React from 'react';
import Editor from '@monaco-editor/react';

interface Props {
  content: string;
  language: string;
}

const EditorTab: React.FC<Props> = ({ content, language }) => {
  return (
    <Editor
      height="500px"
      language={language}
      value={content}
      theme="vs-dark"
      options={{ readOnly: false }}
    />
  );
};

export default EditorTab;