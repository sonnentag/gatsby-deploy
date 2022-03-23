import * as React from "react"
import { Link, graphql } from "gatsby"

import Seo from "../components/seo"

const MainPage = ({ location, data }) => (
  <>
    <Seo title="Main" />
    {location.state?.query ? <h2> all {location.state.query} </h2> : null }
    <div className="table-responsive w-75 p-4 mx-5">
    {location.state?.query && location.state.query === 'repos'
        ? data.repos.distinct.map(node => (
            <div className="d-flex resultRow">
                <div className="flex-fill">
                    <Link to={node}>
                        {node}
                    </Link>
                </div>
            </div>
        ))
        : location.state?.query && location.state.query === 'packages'
        ? data.packages.distinct.map(node => (
            <div className="d-flex resultRow">
                <div className="flex-fill">
                    <Link to={node}>
                        {node}
                    </Link>
                </div>
            </div>
        ))
        : <div className="d-flex justify-content-center">Please select either repos or packages from the menu above.</div>
    }
    </div>
  </>
)

export const mainQuery = graphql`
  query {
    packages: allDataJson (sort: { fields: [packages___package], order: ASC }) {
        nodes {
          packages {
            package
          }
        }
      distinct(field: packages___package)
    }
    repos: allDataJson (sort: { fields: [packages___repo], order: ASC }) {
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
