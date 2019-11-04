import React, { Component } from 'react';
import Helmet from 'react-helmet';
/**
 * Fetch and display a Post
 */
class Page404 extends Component {

  render() {
    return (
      <div>
        <Helmet>
          <title>404: Not Found</title>
        </Helmet>
        <h1>404: Not Found</h1>
      </div>
    );
  }
}

export default Page404;
