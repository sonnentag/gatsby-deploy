import * as React from "react"
import { Link, graphql } from "gatsby"

import Seo from "../components/seo"


const MainPage = ({ location, data }) => (
  <>
    <Seo title="Main" />
    <h1>Welcome to {location.state?.query && location.state.query} </h1>
    <ul>
    {location.state?.query && location.state.query === 'repos'
        ? data.repos.edges.map(edge => (
            <li key={edge.node.parent.name}>
                {edge.node.parent.name}
            </li>
        ))
        : location.state?.query && location.state.query === 'packages'
        ? data.packages.distinct.map(node => (
            <li key={node}>
                {node}
            </li>
        ))
        : <li/> 
    }
    </ul>
    <Link to="/">Go back to the homepage</Link>
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
