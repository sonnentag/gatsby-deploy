import * as React from "react"
import { graphql, Link } from "gatsby"
import Seo from "../components/seo"


const PackageResults = ({ data }) => (
    <>
      <Seo title="Results" />
    <ul>
      { data.allDataJson.edges.map(edge => (
            <li key={edge.node.parent.name}>
                <Link to={edge.node.parent.name} >
                    {edge.node.parent.name}
                </Link>
            </li>
      ))}
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
            version
          }
        }
      }
    }
  }
`

export default PackageResults
