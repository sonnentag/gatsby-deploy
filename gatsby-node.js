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
        edges {
          node {
            packages { package version }
            parent {
              ... on File {
                id
                name
              }
            }
          }
        }
        distinct(field: packages___package)
      }
    }
  `)

  data.packages.distinct.forEach(node => {
      actions.createPage({
          path: '/' + node,
          component: path.resolve('./src/templates/packageResults.js'),
          context: { packageName: node }
      })
  }),
  data.packages.edges.forEach(edge => {
      actions.createPage({
          path: '/' + edge.node.parent.name,
          component: path.resolve('./src/templates/repoResults.js'),
          context: { repoId: edge.node.parent.id }
      })
  })
}
