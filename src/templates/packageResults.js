import * as React from "react"
import { Table } from "react-bootstrap"
import { graphql, Link } from "gatsby"
import Seo from "../components/seo"


let path = window.location.pathname;

const PackageResults = ({ data, path }) => (
    <>
      <Seo title="Results" />
      <ul>
        <table class="table table-hover table-condensed table-borderless">
          <thead>
            <tr>
              <th scope="column">All repos with {path.substring(1)}</th>
              <th scope="column">Version</th>
            </tr>
          </thead>
  
          { data.allDataJson.edges.map(edge => (
            <tbody>
              <tr>
                <td>{edge.node.parent.name}</td>
                <td>{edge.node.packages.version}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </ul>
    </>
)

export const query = graphql`
  query PackageQuery($packageName: String) {
    allDataJson(filter: {packages: {elemMatch: {package: {eq: $packageName}}}}) {
      edges {
        node {
          parent {
            ... on File {
              id
              name
            }
          }
          packages {
            package
            version
          }
        }
      }
    }
  }
`

export default PackageResults
