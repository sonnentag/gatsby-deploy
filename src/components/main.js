import * as React from "react"
import { Container, Navbar, Nav } from "react-bootstrap"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const Header = ({ siteTitle }) => (
  <header className="bg-dark">
    <Container>
      <Navbar expand="md" variant="dark">
        <Navbar.Brand href="/">{siteTitle}</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarResponsive" />
        <Navbar.Collapse id="navbarResponsive">
          <Nav as="ul" className="ms-auto">
            <Nav.Item as="li">
              <Link 
                to="/main" 
                state={{ query: "repos" }}
                className="nav-link" 
                activeClassName="active"
              >
                Repos
              </Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Link 
                to="/main" 
                state={{ query: "packages" }}
                className="nav-link" 
                activeClassName="active"
              >
                Packages
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse> 
      </Navbar>
    </Container>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
