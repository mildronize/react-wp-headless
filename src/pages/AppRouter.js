import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Search from './Search';
import Page from './Page';
import Post from './Post';
import Category from './Category';
import PageLayout from '../components/layouts/PageLayout';
import Debug from './Debug';
import Page404 from './404';

export default () => (
  <PageLayout>
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/search" component={Search} />
        <Route exact path="/page/:slug" component={Page} />
        <Route exact path="/post/:slug" component={Post} />
        <Route exact path="/category/:slug" component={Category} />
        <Route exact path="/debug" component={Debug} />
        <Route exact path="/404" component={Page404} />
      </Switch>
      </div>
    </PageLayout>
);
