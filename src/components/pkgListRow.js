import * as React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"


const PkgListRow = ({ pkg }) => (
    <div className="d-flex resultRow">
        <div className="flex-fill">
            <Link to={pkg}>
                {pkg}
            </Link>
        </div>
    </div>
)

PkgListRow.propTypes = {
    pkg: PropTypes.string,
}

PkgListRow.defaultProps = {
    pkg: ``,
}

export default PkgListRow
