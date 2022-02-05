import * as React from "react"
import { Link, graphql } from "gatsby"

import Seo from "../components/seo"

const MainPage = ({ location, data }) => (
  <>
    <Seo title="Main" />
    <h1> {location.state?.query && location.state.query} </h1>
    <ul>
    {location.state?.query && location.state.query === 'repos'
        ? data.repos.edges.map(edge => (
            <li key={edge.node.parent.name}>
                <Link
                    to="/results"
                    state={{ select: edge.node.parent.name }}
                >
                    {edge.node.parent.name}
                </Link>
            </li>
        ))
        : location.state?.query && location.state.query === 'packages'
        ? data.packages.distinct.map(node => (
            <li key={node}>
                <Link
                    to="/results"
                    state={{ select: node }}
                >
                    {node}
                </Link>
            </li>
        ))
        : <p>Please select either repos or packages from the menu above.</p>
    }
    </ul>
  </>
)

export const mainQuery = graphql`
  query {
    packages: allDataJson {
      edges {
        node {
          packages {
            package
          }
        }
      }
      distinct(field: packages___package)
    }
    repos: allDataJson {
      edges {
        node {
          parent {
            ... on File {
              name
            }
          }
        }
      }
    }
  }
`

export default MainPage
