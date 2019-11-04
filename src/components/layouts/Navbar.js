import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { withApollo } from 'react-apollo';
import { compose } from 'recompose';
import axios from 'axios';
import gql from 'graphql-tag';
import Config from '../../config';

const menu_slug = 'header-menu';

// Checks if urltype is internal or external
// const isInternal = urltype => urltype.includes('internal');

class Header extends Component {
  state = {
    menus: [],
  };

  componentDidMount() {
    // this.executeMenu();
  }

  /**
   * Execute the menu query, parse the result and set the state
   */
  executeMenu = async () => {
    try {
      const response = await axios(`${Config.wpUrl}/menus/v1/menus/${menu_slug}`);
      console.log(response.data);
      this.setState({
        menus: response.data.items,
      });
    } catch (error) { 
     console.log(error);
    }

    // object: custom, post, page
  };

  render() {
    const { menus } = this.state;
    return (
      <div>
        <div>
            <nav className="navbar navbar-expand-sm navbar-light bg-white fixed-top">
            <div className="page-container">
            <a className="navbar-brand d-flex align-items-center" href="/">
                <div className="logo">mildronize </div>
                {/* <a href="/about/#blog-development" className="tag-alpha">new</a> */}
            </a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                <li className="nav-item d-flex justify-content-center">
                <Link className="nav-link" to="/">
                    home <span className="sr-only">(current)</span>
                </Link>
                </li>
{/*                 
                {menus.map(menu => 
                    <li key={menu.object_id} className="nav-item d-flex justify-content-center">
                        <Link  to={"/page/" + menu.object_id} className="nav-link" >
                            {menu.title}
                        </Link>
                    </li>
                )} */}
                <li className="nav-item d-flex justify-content-center">
                    <Link className="nav-link" to="/page/about">about</Link>
                </li>
                <li className="nav-item d-flex justify-content-center">
                    <Link className="nav-link" to="/search">search</Link>
                </li>
               
                </ul>
            </div>
            </div>
            </nav>
            <div className="header-offset-bottom"></div>

        </div>

      </div>
    );
  }
}

export default compose(
  withRouter,
  withApollo,
)(Header);
