/**
 * @type {import('gatsby').GatsbyConfig}
 */
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
        icon_options: {
          purpose: 'any maskable',
        },
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
      resolve: `gatsby-plugin-netlify`,
      options: {
        mergeSecurityHeaders: true,
        mergeCachingHeaders: true,
        generateMatchPathRewrites: true,
      },
    },
    {
      resolve: 'gatsby-plugin-offline',
      options: {
        precachePages: ['./src/pages/'],
        workboxConfig: {
          clientsClaim: true,
          skipWaiting: true,
          globPatterns: ['**/static/images/**/*']
        },
      }
    },
  ],
};