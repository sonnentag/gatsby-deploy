import * as React from "react"
import { graphql } from "gatsby"

import Seo from "../components/seo"


const ResultsPage = ({ location, data }) => (
  <>
    <Seo title="Results" />
    <p>{location.state?.select && location.state.select}</p>
    <ul>
    {
      location.state?.query && location.state?.select && location.state.query === 'repos'
      ? data.repos.edges.map(edge => (
        <p>{edge.node.parent.name}</p>
      ))
      : location.state?.query && location.state?.select && location.state.query === 'packages'
      ? data.packages.edges.map(edge => (
        <p>{edge.node.packages.package}: {edge.node.packages.version}</p>
      ))
      : <p>Please select either repos or packages from the menu above.</p>
    }
    </ul>
  </>
)

export const resultQuery = graphql`
  query {
    packages: allDataJson( filter: {parent: {id: {eq: location.state.select }}}) 
    {
      edges {
        node {
          packages { package version }
        }
      }
    }
    repos: allDataJson(filter: {packages: {elemMatch: {package: {eq: location.state.select }}}}) 
    {
      edges {
        node {
          parent {
            ... on File {
              id
              name
            }
          }
        }
      }
    }
  }
`

export default ResultsPage
