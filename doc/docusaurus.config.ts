import type * as Preset from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes as prismThemes } from 'prism-react-renderer';

const title = 'React Native Styled System';
const description = 'Deadly Simple Style Library';
const websiteUrl = 'https://mym0404.github.io/react-native-styled-system/';
const repoOrg = 'mym0404';
const repoName = 'react-native-styled-system';
const repoUrl = 'https://github.com/mym0404/react-native-styled-system';
const coverImage = 'img/ogimage.png';

const config: Config = {
  title: title,
  tagline: description,
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://mym0404.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/react-native-styled-system/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: repoOrg, // Usually your GitHub org/user name.
  projectName: repoName, // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: `${repoUrl}/tree/main/doc/`,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: coverImage,
    docs: {
      sidebar: {
        hideable: true,
      },
    },
    navbar: {
      title: title,
      logo: {
        alt: 'React Native Styled System',
        src: 'img/logo96.png',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        // { to: '/blog', label: 'Blog', position: 'left' },
        // {
        //   type: 'localeDropdown',
        //   position: 'right',
        // },
        {
          href: repoUrl,
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: repoUrl,
            },
            {
              label: 'NPM',
              href: 'https://www.npmjs.com/package/@react-native-styled-system/core',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} MJ Studio.`,
    },
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    prism: {
      theme: prismThemes.duotoneDark,
      darkTheme: prismThemes.duotoneDark,
    },
  } satisfies Preset.ThemeConfig,

  themes: [
    [
      require.resolve('@cmfcmf/docusaurus-search-local'),
      {
        indexBlog: false,
      },
    ],
  ],

  plugins: ['docusaurus-plugin-sass', './plugins/raw-docs-plugin.js'],
};

export default config;
