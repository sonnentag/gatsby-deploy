import React from "react"
const defaultState = {
    repo: false,
    package: false,
}

const PageContext = React.createContext(defaultState)

class PageProvider extends React.Component {
    state = {
        repo: false, 
        package: false,
    }

    componentDidMount() {
        const chosenRepo = JSON.parse(localStorage.getItem("repo"))
        const chosenPkg = JSON.parse(localStorage.getItem("package"))
        if (chosenRepo) {
            this.setState({ repo: chosenRepo })
        } else if (chosenPkg) {
            this.setState({ package: chosenPkg })
        }
    }

    render() {
        const { children } = this.props
        const { repo, package } = this.state
        return (
            <PageContext.Provider
                value={{
                    repo,
                    package,
                }}
            >
                {children}
            </PageContext.Provider>
        )
    }
}
export default PageContext
export { PageProvider }
