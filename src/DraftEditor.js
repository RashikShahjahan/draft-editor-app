import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6

const DraftEditor = () => {
  const [draft, setDraft] = useState('');
  const apiBaseUrl = 'https://localhost:8000'; // Replace with your actual API base URL

  useEffect(() => {
    const fetchDraft = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/draft`);
        setDraft(response.data.draft || '');
      } catch (error) {
        console.error('Error fetching the draft:', error);
      }
    };

    fetchDraft();
  }, []);

  const publishDraft = async () => {
    try {
      await axios.post(`${apiBaseUrl}/draft`, { story: draft });
      alert('Draft published successfully!');
      // Fetch the new draft after publishing
      const response = await axios.get(`${apiBaseUrl}/draft`);
      setDraft(response.data.draft || '');
    } catch (error) {
      console.error('Error publishing the draft:', error);
    }
  };

  const handleEditorChange = (content, delta, source, editor) => {
    setDraft(editor.getHTML()); // Or use content for raw HTML
  };

return (
    <div>
        <h1>খুদ্র গপ্পো </h1>
        <ReactQuill value={draft} onChange={handleEditorChange} />
        <button onClick={publishDraft}>Publish Draft</button>
    </div>
);
};

export default DraftEditor;
