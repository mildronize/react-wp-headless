import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
// import { Link } from 'react-router-dom';
import PostList from '../components/PostList';
import QueryString from 'query-string';

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
  }
`;

class Home extends Component {
  state = {
    userId: null,
    first_page: {
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
    const parsed = QueryString.parse(this.props.location.search);
    console.log(parsed);
  }

  /**
   * Execute the page query using uri and set the state
   */
  executePageQuery = async () => {
    const { match, client } = this.props;
    let uri = match.params.slug;
    if (!uri) {
      // default page;
      uri = 'welcome';
    }
    const result = await client.query({
      query: PAGE_QUERY,
      variables: { uri },
    });
    const first_page = result.data.pageBy;
    this.setState({ first_page });
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

    this.setState({ posts });
  };

  render() {
    const { first_page, posts } = this.state;
    return (
      <div>
          <span
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: first_page.content,
            }}
          />

        <hr />

        <div className="page-section-header">Latest Posts</div>
        <PostList posts={posts}/>
        <center><a href="/blog/">All blog posts</a></center>
      </div>
    );
  }
}

export default withApollo(Home);
