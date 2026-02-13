import React, { useCallback, useState } from 'react';
import { useDoc } from '@docusaurus/theme-common/internal';
import type { WrapperProps } from '@docusaurus/types';
import { usePluginData } from '@docusaurus/useGlobalData';
import type ContentType from '@theme/DocItem/Content';
import Content from '@theme-original/DocItem/Content';

type Props = WrapperProps<typeof ContentType>;

const CopyMarkdownButton = () => {
  const { metadata } = useDoc();
  const rawDocs = usePluginData('raw-docs-plugin') as Record<string, string>;
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle');

  const rawSource = rawDocs?.[metadata.source];

  const handleCopy = useCallback(async () => {
    if (!rawSource) {
      return;
    }

    try {
      await navigator.clipboard.writeText(rawSource);
      setStatus('copied');
      setTimeout(() => setStatus('idle'), 2000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 2000);
    }
  }, [rawSource]);

  if (!rawSource) {
    return null;
  }

  const label = { idle: 'Copy Markdown', copied: 'Copied!', error: 'Failed' }[status];

  return (
    <button className={'copy-markdown-button'} onClick={handleCopy}>
      {label}
    </button>
  );
};

const ContentWrapper = (props: Props) => (
  <>
    <div className={'copy-markdown-container'}>
      <CopyMarkdownButton />
    </div>
    <Content {...props} />
  </>
);

export default ContentWrapper;
