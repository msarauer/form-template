/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
require('dotenv').config({path:'.env'})

module.exports = {
  /* Your site config here */
  plugins: [
    {
      resolve: "gatsby-source-prismic",
      options: {
        repositoryName: process.env.GATSBY_PRISMIC_REPO_NAME,
        accessToken: process.env.PRISMIC_ACCESS_TOKEN,
        customTypesApiToken: process.env.PRISMIC_CUSTOM_TYPES_API_TOKEN,
        // schemas: {
        //   'wizard': require('./src/schemas/wizard.json'),
        //   'radio_group': require('./src/schemas/radio_group.json'),
        //   'text_area': require('./src/schemas/text_area.json'),
        //   'text_input': require('./src/schemas/text_input.json'),
        //   'checklist_gr': require('./src/schemas/checklist_gr.json'),
        //   'form': {},
        //   'radio_input': {}
        // }
      },
    },
    'gatsby-plugin-image',
    `gatsby-plugin-sass`,
  ],
}
