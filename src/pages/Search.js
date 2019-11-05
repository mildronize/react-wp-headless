import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

/**
 * GraphQL post search query that takes a filter
 * Returns the titles, slugs and authors of posts found
 */
const POST_SEARCH_QUERY = gql`
  query PostSearchQuery($filter: String!) {
    posts(where: { search: $filter }) {
      edges {
        node {
          title
          slug
          author {
            name
          }
        }
      }
    }
  }
`;

/**
 * Search component that fetches results by filter
 */
class Search extends Component {
  state = {
    posts: [],
    filter: '',
  };

  handleKeyDown = e => {
    if (e.keyCode === 13) {
      this.executeSearch();
    }
    return true;
  };

  /**
   * Execute search query, process the response and set the state
   */
  executeSearch = async () => {
    const { client } = this.props;
    const { filter } = this.state;
    let posts = [];
    if (filter.length === 0) {
      this.setState({ posts });
    } else {
      const result = await client.query({
        query: POST_SEARCH_QUERY,
        variables: { filter },
      });
      posts = result.data.posts.edges;
      posts = posts.map(post => {
        const finalLink = `/post/${post.node.slug}`;
        const modifiedPost = { ...post };
        modifiedPost.node.link = finalLink;
        return modifiedPost;
      });
      this.setState({ posts });
    }
  };

  render() {
    const { posts } = this.state;
    return (
      <div >
        <div className="row  w-100 ">
            <div className="col-10">
              <input type="text" className="form-control" placeholder="Search keywords"
              onChange={e => this.setState({ filter: e.target.value })}
              onKeyDown={this.handleKeyDown}
              />
             </div>
             <div className="col">
              <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={() => this.executeSearch()}>Search</button>
            </div>
        </div>
        <div className="flex mt2 items-start">
          <div className="flex items-center" />
          <div className="ml1">
          <div className="my-3" />
            {posts.map((post, index) => (
              <div key={post.node.slug}>
                <span className="postlist-link">{index + 1}. </span>
                <Link to={post.node.link} className="postlist-link">
                  {post.node.title}
                </Link>
                <div className="my-3" />
              </div>
            ))}
            <div className="f6 lh-copy gray" />
          </div>
        </div>
      </div>
    );
  }
}

export default withApollo(Search);
