/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    query {
      repos: allDataJson {
        edges {
          node {
            parent {
              ... on File {
                id
                name
              }
            }
          }
        }
      }
      packages: allDataJson {
        edges {
          node {
            packages { 
              package
              version
            }
          }
        }
      }
    }
  `)

  data.repos.edges.forEach(edge => {
      actions.createPage({
          path: '/' + edge.node.parent.name,
          component: path.resolve('./src/templates/repoResults.js'),
          context: { repo: edge.node.parent.name }
      })
  })

  data.packages.edges.forEach(edge => {
      name = edge.node.packages.package,
      newName = name.replace(/\//g, "-"),
      actions.createPage({
          path: '/' + newName, 
          component: path.resolve('./src/templates/packageResults.js'),
          context: { repo: edge.node.packages.package }
      })
  })
}
