import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
// import { Link } from 'react-router-dom';
import PostList from '../components/PostList';
import { PostListLoader } from '../components/Loaders';

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
class Blog extends Component {

    state = {
        isLoading: true,
        posts: []
      };

    componentDidMount() {
        this.executePagesAndCategoriesQuery();
    }

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
    this.setState({ isLoading: false });
  };

    render(){
        const { posts,isLoading } = this.state;
        return (
            <div>
               <Helmet title="Blog lists"/>
               <h1>Archive</h1>
               {isLoading?<PostListLoader />:<PostList posts={posts}/>}
            </div>
        )
    }
}

export default withApollo(Blog);