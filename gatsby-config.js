/**
 * @type {import('gatsby').GatsbyConfig}
 */

require('firebase/auth');
const { initializeApp } = require('firebase/app');

const firebaseConfig = {
  apiKey: "AIzaSyAEwgR9D1dyYHeAn2BQryHm-IuipfgBCrs",
  authDomain: "terapia-genesis.firebaseapp.com",
  projectId: "terapia-genesis",
  storageBucket: "terapia-genesis.appspot.com",
  messagingSenderId: "937946542554",
  appId: "1:937946542554:web:98a501ed67031108f490e3",
  measurementId: "G-SG8Q78JFK7",
  databaseURL: "https://terapia-genesis-default-rtdb.firebaseio.com/",
};

initializeApp(firebaseConfig);

// 👇 ESTA ES LA FORMA CORRECTA DEL ADAPTERR
const netlifyAdapter = require("gatsby-adapter-netlify").default;

module.exports = {
  jsxRuntime: "automatic",

  // 👇 ADAPTER OFICIAL (REEMPLAZA AL PLUGIN)
  adapter: netlifyAdapter(),

  siteMetadata: {
    title: "Terapia Genesis",
    siteUrl: "https://www.terapiagenesisapp.com",
  },

  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",

    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Terapia Genesis",
        start_url: "/",
        background_color: "#100e17",
        theme_color: "#100e17",
        display: "standalone",
        icon: "src/images/icon.png",
        cache_busting_mode: "none",
      },
    },

    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",

    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },

    "gatsby-plugin-react-helmet",
    "gatsby-plugin-offline",
  ],
};