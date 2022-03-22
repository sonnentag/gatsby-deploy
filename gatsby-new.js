/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    query {
      packages: allDataJson {
        distinct(field: packages___package)
          nodes {
            packages { 
                package 
                version 
                repo 
                installer 
            }
          }
      }
      repos: allDataJson {
        distinct(field: packages___repo)
          nodes {
            packages { 
                package 
                version 
                repo 
                installer 
            }
          }
        }
    }
  `)

  data.packages.distinct.forEach(pkg => {
      actions.createPage({
          path: '/' + pkg,
          component: path.resolve('./src/templates/packageResults.js'),
          context: { packageName: pkg }
      })
  }),
  createPaginatedPages({
    edges: data.packages.distinct,
    createPage: createPage,
    pageTemplate: 'src/templates/packageResults.js',
    pageLength: 30, // This is optional and defaults to 10 if not used
    pathPrefix: '', // This is optional and defaults to an empty string if not used
    context: {}, // This is optional and defaults to an empty object if not used
  }),
  data.repos.distinct.forEach(node => {
      actions.createPage({
          path: '/' + node,
          component: path.resolve('./src/templates/repoResults.js'),
          context: { repoName: node }
      })
  })
}
