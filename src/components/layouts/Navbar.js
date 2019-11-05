import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
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
            <NavbarBrand href="/"><div className="logo">mildronize </div></NavbarBrand>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/">home</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/page/about">about</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/search">search</NavLink>
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

