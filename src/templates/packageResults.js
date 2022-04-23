import * as React from "react"
import { graphql } from "gatsby"
import Seo from "../components/seo"


/* template for pages created for all repos containing selected package */
const PackageResults = ({ data, path = window.location.pathname }) => (
    <>
      <Seo title="Results" />
        <table className="table table-hover table-condensed table-striped">
          <thead>
            <tr>
              <th scope="column">All repos with {path.substring(1)}</th>
              <th scope="column">Version</th>
            </tr>
          </thead>
        </table>
        <div className="table-responsive w-75 p-4 mx-5">
            { data.allDataJson.nodes.map(node => {
               return node.packages.map(pkg =>
                    pkg.package === path.substring(1) ? 
                        <div className="d-flex resultRow">
                            <div className="w-50 flex-fill">{pkg.repo}</div>
                            <div className="flex-fill">{pkg.version}</div>
                        </div>
                    : null
                ) 
              })
            }
        </div>
    </>
)

export const query = graphql`
  query PackageQuery($packageName: String) {
    allDataJson(filter: {packages: {elemMatch: {package: {eq: $packageName}}}}, sort: { fields: [packages___version], order: ASC }) {
    nodes {
        packages {
            package
            version
            repo
            installer
        }
      }
    }
  }
`

export default PackageResults
