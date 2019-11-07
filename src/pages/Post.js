import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import Prism from 'prismjs';
import Config from '../config';
import { DateTime } from 'luxon';
import { ArticleLoader } from '../components/Loaders';
import { Redirect } from 'react-router-dom';

/**
 * GraphQL post query that takes a post slug as a filter
 * Returns the title, content and author of the post
 */
const POST_QUERY = gql`
  query PostQuery($filter: String!) {
    postBy(slug: $filter) {
      title
      content
      date
      author {
        name
      }
    }
  }
`;

/**
 * Fetch and display a Post
 */
class Post extends Component {
  state = {
    post: {
      title: '',
      content: '',
      author: {
        name: '',
      },
    },
    isLoading: true,
    isError: false,
  };

  async componentDidMount() {
    await this.executePostQuery();
    // try{
    //   const { post } = this.props.location.state;
    //   this.setState({ post });
    //   this.setState({ isLoading: false });
    //   console.log("Loaded from location");
      
    // }catch(error){
    //   // console.log(error);
    //   console.log("Fetching from server");
    //   await this.executePostQuery();
    // }
    
    Prism.highlightAll();
    // console.log(this.state.post);
  }

  /**
   * Execute post query, process the response and set the state
   */
  executePostQuery = async () => {
    try{
      const { match, client } = this.props;
      const filter = match.params.slug;
      const result = await client.query({
        query: POST_QUERY,
        variables: { filter },
      });
      const post = result.data.postBy;
      this.setState({ post });
      this.setState({ isLoading: false });
    } catch (error) { 
      this.setState({ isError: true });
      console.log(error);
    } 
  };

  render() {
    const { post,isLoading, isError } = this.state;
    return (
      <div>
        {isLoading?<ArticleLoader />:
        <div>
          <h1 class="post-title" dangerouslySetInnerHTML={{
              __html: post.title,
            }}/>
     
            <p class="post-date">
              {
                DateTime.fromISO(post.date, { zone: Config.timezone }).toFormat('MMMM d, yyyy')
              }
              {/* <span id="viewer"></span> */}
            </p> 
          <div
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          />
          <div>Written by {post.author.name}</div>
        </div>
        }
        {isError?<Redirect to="/404" />:<div/>}
        
        </div>
    );
  }
}

export default withApollo(Post);
