// Main App: src/App.tsx
import React, { useState } from 'react';
import EditorTab from './components/EditorTab';
import { detectLanguage } from './utils/detectLanguage';
import { formatText } from './utils/formatText';

interface Tab {
  id: number;
  title: string;
  content: string;
  language: string;
  error?: string;
}

const App = () => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTabId, setActiveTabId] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const handlePaste = async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text');
    const language = detectLanguage(pasted);

    let formatted = pasted;
    let error = '';
    try {
      formatted = await formatText(pasted, language);
    } catch (err) {
      error = 'The pasted data appears to be malformed or could not be formatted.';
      setToast(error);
    }

    const newTab: Tab = {
      id: Date.now(),
      title: `Tab ${tabs.length + 1}`,
      content: formatted,
      language,
      error,
    };

    setTabs((prevTabs) => [...prevTabs, newTab]);
    setActiveTabId(newTab.id);

    setTimeout(() => setToast(null), 5000);
  };

  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🧠 Smart Text Editor</h1>
      {toast && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-400 rounded">
          {toast}
        </div>
      )}
      <textarea
        placeholder="Paste your content here..."
        onPaste={handlePaste}
        className="w-full p-2 border border-gray-300 rounded mb-4"
        rows={5}
      />
      <div className="flex space-x-2 mb-2 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTabId(tab.id)}
            className={`px-3 py-1 rounded whitespace-nowrap ${
              tab.id === activeTabId ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>
      {activeTab && (
        <div>
          {activeTab.error && (
            <div className="text-red-600 font-semibold mb-2">
              {activeTab.error}
            </div>
          )}
          <EditorTab content={activeTab.content} language={activeTab.language} />
        </div>
      )}
    </div>
  );
};

export default App;
