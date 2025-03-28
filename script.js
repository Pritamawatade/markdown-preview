document.addEventListener('DOMContentLoaded', () => {
    const markdownInput = document.getElementById('markdown-input');
    const previewOutput = document.getElementById('preview-output');
    const clearBtn = document.getElementById('clear-btn');

    // Configure Marked.js with Highlight.js
    marked.setOptions({
        highlight: function(code, lang) {
            const language = hljs.getLanguage(lang) ? lang : 'plaintext';
            return hljs.highlight(code, { language }).value;
        },
        langPrefix: 'hljs language-',
        breaks: true,
        gfm: true
    });

    // Real-time Markdown rendering
    function renderMarkdown() {
        const markdownText = markdownInput.value;
        try {
            const htmlContent = marked.parse(markdownText);
            previewOutput.innerHTML = htmlContent;
        } catch (error) {
            previewOutput.innerHTML = `<p style="color: red;">Error parsing markdown: ${error.message}</p>`;
        }
    }

    // Event Listeners
    markdownInput.addEventListener('input', renderMarkdown);

    // Clear button functionality
    clearBtn.addEventListener('click', () => {
        markdownInput.value = '';
        previewOutput.innerHTML = '';
    });

    // Optional: Load sample markdown on first load
    const sampleMarkdown = `# Welcome to Markdown Previewer

## Features
- **Live preview**
- Supports *formatting*
- Easy to use

### Code Example
\`\`\`javascript
function greet(name) {
    return \`Hello, \${name}!\`;
}
\`\`\`

[Visit Marked.js](https://marked.js.org)

1. First item
2. Second item
3. Third item
`;

    markdownInput.value = sampleMarkdown;
    renderMarkdown();
});
