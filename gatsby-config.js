/**
 * @type {import('gatsby').GatsbyConfig}
 */

const options = {
  importWorkboxFrom: `local`,
  globPatterns: ['**/src/images/*', '**/static/*'],
  cacheId: `gatsby-plugin-offline`,
  precachePages: [`/`, `/circulo-base`, `/circulo-base/*`, '/intro-text/'],
  runtimeCaching: [
    {
      urlPattern: /(\.js$|\.css$|static\/)/,
      handler: `CacheFirst`,
    },
  ],
  skipWaiting: true,
  clientsClaim: true,
}

module.exports = {
  jsxRuntime: 'automatic',
  siteMetadata: {
    title: 'Terapia Genesis',
    siteUrl: 'https://www.terapiagenesisapp.com',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-image',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Terapia Genesis',
        start_url: '/',
        background_color: '#100e17',
        theme_color: '#100e17',
        display: 'standalone',
        icon: 'src/images/icon.png',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        'name': 'images',
        'path': './src/images/',
      },
      __key: 'images',
    },
    {
     resolve: `gatsby-plugin-offline`,
     options: options,
    },
    `gatsby-plugin-netlify`

  ],
};
