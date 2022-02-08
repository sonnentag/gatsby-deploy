import * as React from "react"
import { graphql, Link } from "gatsby"
import Seo from "../components/seo"


const RepoResults = ({ data }) => (
    <>
      <Seo title="Results" />
    <ul>
      { data.dataJson.packages.map(node => (
            <li key={node.package}>
                <Link to={node.package} >
                    {node.package}
                </Link>
            </li>
      ))}
    </ul>
    </>
)

export const query = graphql`
  query RepoQuery($repoId: String) {
    dataJson( parent: {id: {eq: $repoId}}) {
      packages { package version }
    }
  }
`

export default RepoResults
