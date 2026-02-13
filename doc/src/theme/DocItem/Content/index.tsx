import React, { useState, useCallback } from 'react';
import Content from '@theme-original/DocItem/Content';
import type ContentType from '@theme/DocItem/Content';
import type { WrapperProps } from '@docusaurus/types';
import { useDoc } from '@docusaurus/theme-common/internal';
import { usePluginData } from '@docusaurus/useGlobalData';

type Props = WrapperProps<typeof ContentType>;

const CopyMarkdownButton = () => {
  const { metadata } = useDoc();
  const rawDocs = usePluginData('raw-docs-plugin') as Record<string, string>;
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  const rawSource = rawDocs?.[metadata.source];

  const handleCopy = useCallback(async () => {
    if (!rawSource) return;
    try {
      await navigator.clipboard.writeText(rawSource);
      setStatus('copied');
      setTimeout(() => setStatus('idle'), 2000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2000);
    }
  }, [rawSource]);

  if (!rawSource) return null;

  const label = { idle: 'Copy Markdown', copied: 'Copied!', error: 'Failed' }[status];

  return (
    <button className="copy-markdown-button" onClick={handleCopy}>
      {label}
    </button>
  );
};

const ContentWrapper = (props: Props) => (
  <>
    <div className="copy-markdown-container">
      <CopyMarkdownButton />
    </div>
    <Content {...props} />
  </>
);

export default ContentWrapper;
