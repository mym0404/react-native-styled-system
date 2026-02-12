import { type ReactNode, useEffect, useRef } from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import CodeBlock from '@theme/CodeBlock';
import Layout from '@theme/Layout';

import styles from './index.module.css';

const codeWithout = `const Sample = () => {
  const theme = useTheme();
  const { width } = useWindowDimensions();

  const padding = width >= 768 ? 24
    : width >= 480 ? 16 : 8;
  const direction = width >= 480
    ? 'row' : 'column';

  return (
    <View style={{
      backgroundColor: theme.colors.red500,
      borderRadius: theme.radii.lg,
      padding,
      flexDirection: direction,
    }}>
      <Text style={[
        theme.typography.h1,
        { marginTop: theme.spaces[4] },
      ]}>
        React Native
      </Text>
    </View>
  );
};`;

const codeWith = `const Sample = () => {
  return (
    <Box
      bg={'red.500'}
      radius={'lg'}
      p={[2, 4, 6]}
      flexDirection={['column', 'row']}
    >
      <Txt t={'h1'} mt={4}>
        React Native
      </Txt>
    </Box>
  );
};`;

const features = [
  {
    title: 'Token Props',
    description:
      'Pass design tokens directly as component props. Colors, spacing, radii, typography \u2014 all resolved from your theme.',
  },
  {
    title: 'Type-Safe',
    description:
      'Full TypeScript support with auto-generated theme typings. The CLI generates type augmentations from your theme file.',
  },
  {
    title: 'Built-in Tokens',
    description:
      'Ships with a comprehensive color palette and semantic color tokens out of the box. Ready to use without configuration.',
  },
  {
    title: 'Fully Customizable',
    description:
      'Swap themes on the fly, override any token, and merge multiple themes with createTheme. Light mode, dark mode, or your own variants.',
  },
];

const FadeIn = ({ children, delay = 0 }: { children: ReactNode; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      return;
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      el.style.opacity = '1';
      el.style.transform = 'none';

      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.classList.add(styles.visible);
          }, delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={styles.fadeIn}>
      {children}
    </div>
  );
};

const CodeSnippet = ({ code, title }: { code: string; title: string }) => (
  <div className={styles.codeColumn}>
    <h3>{title}</h3>
    <CodeBlock language={'tsx'}>{code}</CodeBlock>
  </div>
);

const Home = () => {
  const { siteConfig } = useDocusaurusContext();

  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <main>
        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.gridBg} />
          <div className={styles.heroContent}>
            <img
              className={styles.heroLogo}
              src={'img/logo96.png'}
              alt={'React Native Styled System'}
            />
            <h1 className={styles.heroTitle}>{siteConfig.title}</h1>
            <p className={styles.tagline}>{siteConfig.tagline}</p>
            <p className={styles.subtitle}>
              {'Pass design tokens as props,'}
              <br />
              {'build responsive layouts with arrays,'}
              <br />
              {'and customize every detail of your theme.'}
            </p>
            <div className={styles.heroButtons}>
              <Link className={'button button--primary button--lg'} to={'/docs/intro'}>
                {'Get Started'}
              </Link>
              <Link
                className={`button button--lg ${styles.outlineButton}`}
                href={'https://github.com/mym0404/react-native-styled-system'}
              >
                {'GitHub'}
              </Link>
            </div>
            <code className={styles.installBar}>{'yarn add @react-native-styled-system/core'}</code>
          </div>
        </section>

        {/* Before/After */}
        <section className={styles.sectionAlt}>
          <div className={'container'}>
            <FadeIn>
              <h2 className={styles.sectionTitle}>{'Less boilerplate. More building.'}</h2>
            </FadeIn>
            <FadeIn delay={100}>
              <div className={styles.codeComparison}>
                <CodeSnippet title={'Without Styled System'} code={codeWithout} />
                <div className={styles.codeArrow}>
                  <span />
                </div>
                <CodeSnippet title={'With Styled System'} code={codeWith} />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* Features */}
        <section className={styles.section}>
          <div className={'container'}>
            <FadeIn>
              <h2 className={styles.sectionTitle}>{'Features'}</h2>
            </FadeIn>
            <div className={styles.featureGrid}>
              {features.map(({ title, description }, i) => (
                <FadeIn key={title} delay={i * 80}>
                  <div className={styles.featureCard}>
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* V2 Banner */}
        <section className={styles.v2Banner}>
          <FadeIn>
            <div className={styles.v2BannerInner}>
              <div className={styles.v2Glow} />
              <h3>{'New in v2.0'}</h3>
              <p>
                {
                  'Built-in design tokens, semantic colors, responsive breakpoints, and theme utilities.'
                }
              </p>
              <Link className={'button button--primary'} to={'/docs/whats-new/v2'}>
                {"What's New"}
              </Link>
            </div>
          </FadeIn>
        </section>
      </main>
    </Layout>
  );
};

export default Home;
