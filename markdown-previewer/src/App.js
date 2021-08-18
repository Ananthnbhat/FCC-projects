import './App.scss';
import { useState } from "react";
import marked from 'marked';
import DOMPurify from 'dompurify';

function App() {

  const [editorContent, setEditorConent] = useState(placeholder)

  const handleChange = event => {
    setEditorConent(event.target.value)
  }

  // INSERTS target="_blank" INTO HREF TAGS (required for Codepen links)
  const renderer = new marked.Renderer();
  renderer.link = function (href, title, text) {
    return `<a target="_blank" href="${href}">${text}</a>`;
  };

  const getMarkdownText = () => {
    var rawMarkup = marked(DOMPurify.sanitize(editorContent, { USE_PROFILES: { html: true } }));
    return { __html: rawMarkup };
  }

  return (
    <div id="wrapper">
      <div id="editor-area">
        <label>Editor</label>
        <textarea id="editor" value={editorContent} onChange={handleChange}></textarea>
      </div>
      <div id="preview-area">
        <label>Preview</label>
        <div id="preview" dangerouslySetInnerHTML={getMarkdownText()}></div>
      </div>
    </div>
  );
}

const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:


`;

export default App;
