import * as React from "react"
import { Table } from "react-bootstrap"
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { graphql, Link } from "gatsby"
import Seo from "../components/seo"

if (typeof window !== "undefined") {
    let path = window.location.pathname;
}

/* template for pages created for all packages in selected repo */
const RepoResults = ({ data, path, search }) => (
    <>
      <Seo title="Results" />
<div className="table-responsive w-auto"> 
      <table className="table table-hover table-condensed table-striped">
        <thead>
          <tr>
            <th scope="column">All packages in {path.substring(1)}</th>
            <th scope="column">Version</th>
          </tr>
        </thead>
      </table>

    <Tabs fill defaultActiveKey="php" id="basicTabs" className="m-3">
            <Tab eventKey="php" title="Composer packages" className="mx-5">
            { data.dataJson.packages.map(node => (
                node.installer == 'php' ?
                <div className="d-flex resultRow">
                  <div className="w-50 flex-fill">{node.package}</div>
                  <div className="flex-fill">{node.version}</div>
                </div>
              : null
            ))}
            </Tab>
            <Tab eventKey="node" title="Node packages" className="mx-5">
            { data.dataJson.packages.map(node => (
                node.installer == 'node' ?
                <div className="d-flex resultRow">
                  <div className="w-50 flex-fill">{node.package}</div>
                  <div className="flex-fill">{node.version}</div>
                </div>
              : null
            ))}
            </Tab>
            </Tabs>
      </div>
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
