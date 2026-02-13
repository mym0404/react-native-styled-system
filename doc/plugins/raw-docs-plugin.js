const fs = require('fs');
const path = require('path');

const collectMdxFiles = (dir, base) => {
  const result = {};
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    const relPath = path.join(base, entry.name);
    if (entry.isDirectory()) {
      Object.assign(result, collectMdxFiles(fullPath, relPath));
    } else if (/\.mdx?$/.test(entry.name)) {
      const key = `@site/docs/${relPath}`;
      result[key] = fs.readFileSync(fullPath, 'utf-8');
    }
  }
  return result;
};

module.exports = function rawDocsPlugin(context) {
  const docsDir = path.join(context.siteDir, 'docs');
  return {
    name: 'raw-docs-plugin',
    async loadContent() {
      return collectMdxFiles(docsDir, '');
    },
    async contentLoaded({ content, actions }) {
      actions.setGlobalData(content);
    },
  };
};
