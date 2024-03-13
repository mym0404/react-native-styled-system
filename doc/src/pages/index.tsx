import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';
import clsx from 'clsx';

import styles from './index.module.css';

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description={'Description will go into a meta tag in <head />'}
    >
      <main style={{ flex: 1, justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
        <div className={clsx(styles.heroBanner, 'container')} style={{ paddingBottom: '120px' }}>
          <img src={'img/logo.svg'} width={64} height={64} alt={'logo'} />
          <Heading as={'h1'} className={'hero__title'}>
            {siteConfig.title}
          </Heading>
          <p className={'hero__subtitle'}>{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link className={'button button--secondary button--lg'} to={'/docs/intro'}>
              {'Getting Started ⏱️'}
            </Link>
          </div>
          <div style={{ marginTop: 64 }}>
            <code style={{ padding: 20, borderWidth: 1 }}>
              {'npm install react-native-themed-styled-system'}
            </code>
          </div>
        </div>
      </main>
    </Layout>
  );
}
