import * as React from "react"
import { graphql } from "gatsby"
import { Tab, Tabs } from 'react-bootstrap';
import PkgListRow from "../components/pkgListRow"

import Seo from "../components/seo"

const pkgList = new Set();

const MainPage = ({ location, data, pkglist }) => (
  <>
    <Seo title="Main" />
    {location.state?.query ? <h2> all {location.state.query} </h2> : null }
    <div className="table-responsive w-75 p-4 mx-5">
    {location.state?.query && location.state.query === 'repos'
        ? data.repos.distinct.map(node => (
               <PkgListRow pkg={node} />
        ))
        : location.state?.query && location.state.query === 'packages'
        ? 
        <Tabs fill defaultActiveKey="php" id="basicTabs" className="m-3">
            <Tab eventKey="php" title="Composer packages" className="mx-5">
             { data.packages.nodes.map(node => ( node.packages
                 .filter(pkg => pkg.installer === "php")
                 .map(pkg => {
                   if(!pkgList.has(pkg.package)) { pkgList.add(pkg.package);
                      return <PkgListRow pkg={pkg.package} />
                     }
                   }
                )
             ))}
            </Tab>
            <Tab eventKey="node" title="Node packages" className="mx-5">
             { data.packages.nodes.map(node => ( node.packages
                 .filter(pkg => pkg.installer === "node")
                 .map(pkg => {
                   if(!pkgList.has(pkg.package)) { pkgList.add(pkg.package);
                      return <PkgListRow pkg={pkg.package} />
                     }
                   }
                )
             ))}
            </Tab>
        </Tabs>
        : <div className="d-flex justify-content-center">Please select either repos or packages from the menu above.</div>
    }
    </div>
  </>
)

export const query = graphql`
  query {
    packages: allDataJson (sort: { fields: packages___package, order: ASC }) {
      distinct(field: packages___package)
        nodes {
            packages {
              package
              installer
            }
        }
    }
    repos: allDataJson (sort: { fields: packages___repo, order: ASC }) {
      distinct(field: packages___repo)
        nodes {
            packages {
              repo
            }
        }
      }
  }
`

export default MainPage
