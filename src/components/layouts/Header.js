import React, { Component } from 'react';
import {Helmet} from "react-helmet";

class Header extends Component {
    render(){
        return (
            <Helmet >
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta charSet="utf-8" />
                <link rel="icon"  type="image/png" href="/favicon.png"/>
                <link rel="apple-touch-icon" href="/favicon.png" />
                <title>My site</title>
            </Helmet>
        );
    }
}

export default Header;