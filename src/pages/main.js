import * as React from "react"
import { Link } from "gatsby"

import Seo from "../components/seo"

const MainPage = ({ location }) => (
  <>
    <Seo title="Main" />
    <h1>Hi from the second page</h1>
    <p>Welcome to {location.state?.query && location.state.query} </p>
    <Link to="/">Go back to the homepage</Link>
  </>
)

export default MainPage
