/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `saama-web`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: ["gatsby-plugin-netlify-cms", "gatsby-plugin-image", "gatsby-plugin-sitemap",
    "gatsby-plugin-styled-components", "gatsby-plugin-sharp", "gatsby-transformer-sharp",
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        "icon": "src/images/icon.png"
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        "name": "images",
        "path": "./src/images/"
      },
      __key: "images"
    }]
};