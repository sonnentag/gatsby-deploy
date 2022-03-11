import * as React from "react"
import { Link, graphql } from "gatsby"

import Seo from "../components/seo"

const MainPage = ({ location, data }) => (
  <>
    <Seo title="Main" />
    <h1> {location.state?.query && location.state.query} </h1>
    <table className="table table-condensed table-borderless">
      <tbody> 
    {location.state?.query && location.state.query === 'repos'
        ? data.repos.edges.map(edge => (
          <tr>
            <td>
                <Link to={edge.node.parent.name} >
                    {edge.node.parent.name}
                </Link>
            </td>
          </tr>
        ))
        : location.state?.query && location.state.query === 'packages'
        ? data.packages.distinct.map(node => (
          <tr>
            <td>
                <Link to={node} >
                    {node}
                </Link>
            </td>
          </tr>
        ))
        : <p>Please select either repos or packages from the menu above.</p>
    }
      </tbody> 
    </table>
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
