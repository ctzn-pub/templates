require('dotenv').config();
const fetch = require(`node-fetch`);
const { createHttpLink } = require(`apollo-link-http`);

const path = require('path');
const config = require('./config');
const plugins = [
  {
    resolve: `gatsby-plugin-algolia`,
    options: {
      appId: process.env.GATSBY_ALGOLIA_APP_ID,
      apiKey: process.env.ALGOLIA_ADMIN_KEY,
      queries: require('./src/utils/algolia'),
    },
  },
  {
    resolve: 'gatsby-plugin-react-leaflet',
    options: {
      linkStyles: false, // (default: true) Enable/disable loading stylesheets via CDN
    },
  },

  'gatsby-plugin-sitemap',
  `gatsby-plugin-remove-fingerprints`,
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `preview`,
      path: `${__dirname}/src/images/preview`,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `templatetypes`,
      path: `${__dirname}/src/images/templatetypes`,
    },
  },
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `images`,
      // path: /\/\.\/src\/components\/images\/candidates\//,
      path: path.join(__dirname, `src`, 'components', `images`, `candidates/`),
    },
  },
  `gatsby-plugin-sharp`,
  `gatsby-transformer-sharp`,
  `gatsby-plugin-styled-components`,
  `gatsby-plugin-emotion`,

  {
    resolve: 'gatsby-plugin-react-svg',
    options: {
      rule: {
        include: /\.svg$/,
        include: /images\/.*\.svg/,
      },
    },
  },
  {
    resolve: 'gatsby-source-graphql', // <- Configure plugin
    options: {
      typeName: 'HASURA',
      fieldName: 'hasura', // <- fieldName under which schema will be stitched
      createLink: () =>
        createHttpLink({
          uri: process.env.GATSBY_HASURA_GRAPHQL_URL,
          headers: {
            // 'hasura-collaborator-token': process.env.GATSBY_HASURA_COLLABORATOR_TOKEN,
            'x-hasura-admin-secret': process.env.GATSBY_HASURA_GRAPHQL_ADMIN_SECRET,
          },
          fetch,
        }),
      //  refetchInterval: 10, // Refresh every 10 seconds for new data
    },
  },
  {
    resolve: `gatsby-plugin-layout`,
    options: {
      component: require.resolve(`./src/templates/docs.js`),
    },
  },
  'gatsby-plugin-react-helmet',
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'docs',
      path: `${__dirname}/content/`,
    },
  },
  {
    resolve: `gatsby-plugin-modal-routing`,
    options: {
      // A selector to set react-modal's app root to, default is `#___gatsby`
      // See http://reactcommunity.org/react-modal/accessibility/#app-element
      appElement: '#___gatsby',

      // Object of props that will be passed to the react-modal container
      // See http://reactcommunity.org/react-modal/#usage
      modalProps: {},
    },
  },

  {
    resolve: 'gatsby-plugin-mdx',
    options: {
      gatsbyRemarkPlugins: [
        {
          resolve: 'gatsby-remark-images',
          options: {
            maxWidth: 1035,
            sizeByPixelDensity: true,
          },
        },
        {
          resolve: 'gatsby-remark-copy-linked-files',
        },
      ],
      extensions: ['.mdx', '.md'],
    },
  },
  {
    resolve: `gatsby-plugin-gtag`,
    options: {
      // your google analytics tracking id
      trackingId: config.gatsby.gaTrackingId,
      // Puts tracking script in the head instead of the body
      head: true,
      // enable ip anonymization
      anonymize: false,
    },
  },
];

// check and add pwa functionality
if (config.pwa && config.pwa.enabled && config.pwa.manifest) {
  plugins.push({
    resolve: `gatsby-plugin-manifest`,
    options: { ...config.pwa.manifest },
  });
  plugins.push({
    resolve: 'gatsby-plugin-offline',
    options: {
      appendScript: require.resolve(`./src/custom-sw-code.js`),
    },
  });
} else {
  plugins.push('gatsby-plugin-remove-serviceworker');
}

// check and remove trailing slash
if (config.gatsby && !config.gatsby.trailingSlash) {
  plugins.push('gatsby-plugin-remove-trailing-slashes');
}

module.exports = {
  pathPrefix: config.gatsby.pathPrefix,
  siteMetadata: {
    title: config.siteMetadata.title,
    description: config.siteMetadata.description,
    docsLocation: config.siteMetadata.docsLocation,
    ogImage: config.siteMetadata.ogImage,
    favicon: config.siteMetadata.favicon,
    logo: {
      link: config.header.logoLink ? config.header.logoLink : '/',
      image: config.header.logo,
    }, // backwards compatible
    headerTitle: config.header.title,
    githubUrl: config.header.githubUrl,
    helpUrl: config.header.helpUrl,
    tweetText: config.header.tweetText,
    headerLinks: config.header.links,
    siteUrl: config.gatsby.siteUrl,
  },
  plugins: plugins,
};
