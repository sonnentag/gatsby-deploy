import * as React from "react"

import Seo from "../components/seo"


const ResultsPage = ({ location }) => (
    <>
        <Seo title="Results" />
<p>{location.state.select}</p>
    </>
)

export default ResultsPage
