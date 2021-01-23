const config = {
  gatsby: {
    pathPrefix: '/',
    siteUrl: 'https://ontopic.io',
    gaTrackingId: null,
    trailingSlash: false,
  },
  header: {
    logo: './onlogo.svg',
    logoLink: 'https://ontopicdocs.netlify.app/',
    title: "<a href='https://ontopicdocs.netlify.app/'>Graph Documentation</a>",
    githubUrl: 'https://github.com/ctzn-pub',
    helpUrl: '',
    tweetText: '',
    social: `<li>
 
		  </li>
 `,
    links: [{ text: '', link: '' }],
    search: {
      enabled: false,
      indexName: '',
      algoliaAppId: process.env.GATSBY_ALGOLIA_APP_ID,
      algoliaSearchKey: process.env.GATSBY_ALGOLIA_SEARCH_KEY,
      algoliaAdminKey: process.env.ALGOLIA_ADMIN_KEY,
    },
  },
  sidebar: {
    forcedNavOrder: [
      // add trailing slash if enabled above
      '/search',
      '/Dashboards',
      './Cards',
      '/ESS-Standard',
      '/GSS-Standard',
      './Nivo',
      './NivoLine',
      '/Charts',
      '/correlation',
      '/facetedScatterChart',
      '/mapBar',
      '/raceChart',
      '/ridgeLine',
      '/scatterChart',
      '/colabTest',
      '/countyAnalysis',
      '/ESS_template',
      '/GSS_template',
      '/Scf',
      '/single_variable',
      '/split_bar',
      '/Timetrend',
      '/yrbs',
    ],
    collapsedNav: [
      // '/maps', // add trailing slash if enabled above
    ],
    links: [{ text: 'Ontopic', link: 'https://ontopic.io' }],
    frontline: false,
    ignoreIndex: true,
    title: '',
  },
  siteMetadata: {
    title: 'Gatsby Gitbook Boilerplate | Ontopic',
    description: 'Documentation built with mdx. Powering ontopic.io ',
    ogImage: null,
    docsLocation: 'https://github.com/ctzn-pub/templates/tree/master/content',
    favicon: 'https://ontopic-static.netlify.app/favicon.ico',
  },
  pwa: {
    enabled: false, // disabling this will also remove the existing service worker.
    manifest: {
      name: 'Gatsby Gitbook Starter',
      short_name: 'GitbookStarter',
      start_url: '/',
      background_color: '#6b37bf',
      theme_color: '#6b37bf',
      display: 'standalone',
      crossOrigin: 'use-credentials',
      icons: [
        {
          src: 'src/pwa-512.png',
          sizes: `512x512`,
          type: `image/png`,
        },
      ],
    },
  },
};

module.exports = config;
