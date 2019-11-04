import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
// import { createHttpLink } from 'apollo-link-http';
// import { InMemoryCache } from 'apollo-cache-inmemory';
// import { ApolloClient } from 'apollo-boost';
import PostList from '../components/PostList';

const headerImageStyle = {
  marginTop: 50,
  marginBottom: 50,
};

/**
 * GraphQL page query
 * Gets page's title and content using slug as uri
 */
const PAGE_QUERY = gql`
  query PageQuery($uri: String!) {
    pageBy(uri: $uri) {
      title
      content
    }
  }
`;

/**
 * GraphQL pages and categories query
 * Gets all available pages and posts titles and slugs
 */
const PAGES_AND_CATEGORIES_QUERY = gql`
  query PagesAndPostsQuery {
    posts {
      edges {
        node {
          title
          slug
          date
        }
      }
    }
    pages {
      edges {
        node {
          title
          slug
        }
      }
    }
  }
`;

class Home extends Component {
  state = {
    userId: null,
    page: {
      title: '',
      content: '',
    },
    pages: [],
    posts: [],
  };

  // used as a authenticated GraphQL client
  authClient = null;

  componentDidMount() {
    this.executePageQuery();
    this.executePagesAndCategoriesQuery();
  }

  /**
   * Execute the page query using uri and set the state
   */
  executePageQuery = async () => {
    const { match, client } = this.props;
    let uri = match.params.slug;
    if (!uri) {
      uri = 'welcome';
    }
    const result = await client.query({
      query: PAGE_QUERY,
      variables: { uri },
    });
    const page = result.data.pageBy;
    this.setState({ page });
  };

  /**
   * Execute the pages and categories query and set the state
   */
  executePagesAndCategoriesQuery = async () => {
    const { client } = this.props;
    const result = await client.query({
      query: PAGES_AND_CATEGORIES_QUERY,
    });
    let posts = result.data.posts.edges;
    posts = posts.map(post => {
      const finalLink = `/post/${post.node.slug}`;
      const modifiedPost = { ...post };
      modifiedPost.node.link = finalLink;
      return modifiedPost;
    });
    let pages = result.data.pages.edges;
    pages = pages.map(page => {
      const finalLink = `/page/${page.node.slug}`;
      const modifiedPage = { ...page };
      modifiedPage.node.link = finalLink;
      return modifiedPage;
    });

    this.setState({ posts, pages });
  };

  render() {
    const { page, posts, pages } = this.state;
    return (
      <div>
        <div className="pa2">
          {/* <img src={logo} width="815" style={headerImageStyle} alt="logo" /> */}
          {/* <h1>{page.title}</h1>
          <span
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: page.content,
            }}
          /> */}

        <center className="hero-section">
          <div className="hero-tagline">I'm Lecturer</div>
          <div className="hero-title">Thada Wangthammang</div>
          <p>Welcome to my personal archive. You can find almost stuff about me - blog posts, resume, projects, contact information, and more.</p>
        </center>

        <hr />

        <div className="page-section-header">Latest Posts</div>
        <PostList posts={posts}/>
        <center><a href="/blog/">All blog posts</a></center>

      
        </div>
      </div>
    );
  }
}

export default withApollo(Home);
