import * as React from "react"
import { Table } from "react-bootstrap"
import { graphql, Link } from "gatsby"
import Seo from "../components/seo"

if (typeof window !== "undefined") {
    let path = window.location.pathname;
}

const PackageResults = ({ data, path }) => (
    <>
      <Seo title="Results" />
        <table className="table table-hover table-condensed table-striped">
          <thead>
            <tr>
              <th scope="column">All repos with {path.substring(1)}</th>
              <th scope="column">Version</th>
            </tr>
          </thead>
          <tbody>
            { data.allDataJson.edges.map(edge => {
                return edge.node.packages.map(pkg =>
                    pkg.package == path.substring(1) ? 
                        <tr>
                            <td> {edge.node.parent.name} </td>
                            <td> {pkg.version} </td>
                        </tr> 
                    : null
                )
              })
            }
          </tbody>
        </table>
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
