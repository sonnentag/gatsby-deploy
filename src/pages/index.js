import * as React from "react"
import { Link, graphql } from "gatsby"

import Seo from "../components/seo"

const MainPage = ({ location, data }) => (
  <>
    <Seo title="Main" />
    <h1> {location.state?.query && location.state.query} </h1>
    <table className="table table-condensed table-borderless">
      <tbody> 
    {location.state?.query && location.state.query === 'repos'
        ? data.repos.distinct.map(node => (
          <tr>
            <td>
                <Link to={node} >
                    {node}
                </Link>
            </td>
          </tr>
        ))
        : location.state?.query && location.state.query === 'packages'
        ? data.packages.distinct.map(node => (
          <tr>
            <td>
                <Link to={node} >
                    {node}
                </Link>
            </td>
          </tr>
        ))
        : <p>Please select either repos or packages from the menu above.</p>
    }
      </tbody> 
    </table>
  </>
)

export const mainQuery = graphql`
  query {
    packages: allDataJson {
        nodes {
          packages {
            package
          }
        }
      distinct(field: packages___package)
    }
    repos: allDataJson {
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
