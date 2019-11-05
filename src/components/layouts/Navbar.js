import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { withApollo } from 'react-apollo';
import { compose } from 'recompose';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <div>
        <Navbar color="light" light expand="sm" className="bg-white ">
          <div className="page-container">
            <NavbarBrand><Link to="/"><div className="logo">mildronize </div></Link></NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink><Link className="nav-link" to="/">home</Link></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink><Link className="nav-link" to="/page/about">about</Link></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink><Link className="nav-link" to="/blog">blog</Link></NavLink>
                </NavItem>
                <NavItem>
                  <NavLink >
                    <Link className="nav-link" to="/search"><i class="fas fa-search"></i></Link>
                  </NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </div>
        </Navbar>
        <div className="header-offset-bottom"></div>
      </div>
    </div>
  );
}

export default compose(
  withRouter,
  withApollo,
)(Header);

