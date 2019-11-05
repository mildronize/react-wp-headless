import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
// import { Link } from 'react-router-dom';
import PostList from '../components/PostList';
import { PostListLoader, WelcomeLoader } from '../components/Loaders';

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
    isLoading: true,
    isLoadingWelcome: true,
    firstPage: {
      title: '',
      content: '',
    },
    pages: [],
    posts: []
  };

  // used as a authenticated GraphQL client
  authClient = null;

  async componentDidMount() {
    await this.executePageQuery();
    await this.executePagesAndCategoriesQuery();
    console.log(this.state.posts);
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
    const firstPage = result.data.pageBy;
    this.setState({ firstPage });
    this.setState({ isLoadingWelcome: false });
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
    this.setState({ isLoading: false });
  };

  render() {
    const { firstPage, pages, posts, isLoading, isLoadingWelcome } = this.state;
    return (
      <div>
         {isLoadingWelcome?<WelcomeLoader/>:
          <span
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: firstPage.content,
            }}
          />}

        <hr />
        <div className="page-section-header">Latest Posts</div>
        {isLoading?<PostListLoader />:<PostList posts={posts}/>}
        <center><a href="/blog/">All blog posts</a></center>
      </div>
    );
  }
}

export default withApollo(Home);
