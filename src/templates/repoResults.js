import * as React from "react"
import { Table } from "react-bootstrap"
import { graphql, Link } from "gatsby"
import Seo from "../components/seo"

import "../styles/results.css"

let path = window.location.pathname;

const RepoResults = ({ data, path }) => (
    <>
      <Seo title="Results" />
    <ul>
      <table class="table table-hover table-condensed table-borderless">
        <thead>
          <tr>
            <th scope="column">All packages in {path.substring(1)}</th>
            <th scope="column">Version</th>
          </tr>
        </thead>
        { data.dataJson.packages.map(node => (
          <tbody>
            <tr>
              <td>{node.package}</td>
              <td>{node.version}</td>
            </tr>
          </tbody>
        ))}
      </table>
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
