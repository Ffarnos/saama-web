/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  jsxRuntime: 'automatic',
  siteMetadata: {
    title: 'Saama',
    siteUrl: 'https://www.yourdomain.tld',
  },
  plugins: [
    'gatsby-plugin-styled-components',
    'gatsby-plugin-image',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Saama',
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
      resolve: 'gatsby-plugin-offline',
      options: {
        precachePages: ['/*'],
        workboxConfig: {
          globPatterns: [
            'src/images/*', // Ruta al icono de la PWA
            'src/images/icon.png', // Ruta a las imágenes adicionales
            'static/images/*',
          ],
          importScripts: ['sw.js'],
        },
      },

    },
  ],
};