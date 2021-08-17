import './App.css';
import { useState } from "react";

function App() {

  const [editorContent, setEditorConent] = useState()

  const handleChange = event => {
    setEditorConent(event.target.value)
  }
  return (
    <div id="wrapper">
      <div id="editor">
        <textarea id="editor-area" value={editorContent} onChange={handleChange}></textarea>
      </div>
      <div id="previewer">
        {editorContent}
      </div>
    </div>
  );
}

export default App;
