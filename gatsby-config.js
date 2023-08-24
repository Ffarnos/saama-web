/**
 * @type {import('gatsby').GatsbyConfig}
 */

const options = {
  importWorkboxFrom: `local`,
  globPatterns: ['**/src/images/*', '**/static/*'],
  cacheId: `gatsby-plugin-offline`,
  // Don't cache-bust JS or CSS files, and anything in the static directory,
  // since these files have unique URLs and their contents will never change
  dontCacheBustURLsMatching: /(\.js$|\.css$|static\/)/,
  runtimeCaching: [
    {
      // Use cacheFirst since these don't need to be revalidated (same RegExp
      // and same reason as above)
      urlPattern: /(\.js$|\.css$|static\/)/,
      handler: `CacheFirst`,
    },
    {
      // page-data.json files, static query results and app-data.json
      // are not content hashed
      urlPattern: /^https?:.*\/page-data\/.*\.json/,
      handler: `StaleWhileRevalidate`,
    },
    {
      // Add runtime caching of various other page resources
      urlPattern:
          /^https?:.*\.(png|jpg|jpeg|webp|svg|gif|tiff|js|woff|woff2|json|css)$/,
      handler: `StaleWhileRevalidate`,
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
