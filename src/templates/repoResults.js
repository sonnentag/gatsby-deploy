import * as React from "react"
import { Table } from "react-bootstrap"
import { graphql, Link } from "gatsby"
import Seo from "../components/seo"

if (typeof window !== "undefined") {
    let path = window.location.pathname;
}

function search(string){ window.find(string); }

const RepoResults = ({ data, path, search }) => (
    <>
      <Seo title="Results" />
      <table className="table table-hover table-condensed table-striped">
        <thead>
          <tr>
            <th scope="column">All packages in {path.substring(1)}</th>
            <th scope="column">Version</th>
          </tr>
        </thead>
        <tbody>
            <input placeholder="Find in Page" type="text" id="search"/>
            <input type="button" value="Go" onclick="search(document.getElementById('search').value)"/>
            <tr><th>Composer packages</th></tr>
            { data.dataJson.packages.map(node => (
                node.installer == 'composer' ?
                <tr>
                  <td>{node.package}</td>
                  <td>{node.version}</td>
                </tr>
              : null
            ))}
            <tr><th>Node packages</th></tr>
            { data.dataJson.packages.map(node => (
                node.installer == 'package-lock' ?
                <tr>
                  <td>{node.package}</td>
                  <td>{node.version}</td>
                </tr>
              : null
            ))}
        </tbody>
      </table>
    </>
)

export const query = graphql`
  query RepoQuery($repoName: String) {
    dataJson(packages: {elemMatch: {repo: {eq: $repoName}}}) {
      packages {
        version
        repo
        package
        installer
      }
    }
  }
`

export default RepoResults
