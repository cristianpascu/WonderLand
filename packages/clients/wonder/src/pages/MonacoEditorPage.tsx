import Editor from '@monaco-editor/react';
import { useState } from 'react';

export const MonacoEditorPage = () => {
    const [code, setCode] = useState('');

    return (
        <Editor
            className="size-full"
            theme="vs-dark"
            language="typescript"
            path="file:///src/pages/MonacoEditorPage.tsx"
            value={code}
            onChange={(value) => setCode(value || '')}
        />
    );
};
