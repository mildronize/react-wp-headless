import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { PageLoader } from '../components/Loaders';
import QueryString from 'query-string';
import { Redirect } from 'react-router-dom';

/**
 * GraphQL page query that takes a page slug as a uri
 * Returns the title and content of the page
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
 * Fetch and display a Page
 */
class Page extends Component {
  state = {
    page: {
      title: '',
      content: '',
    },
    isLoading: true,
    isError: false,
  };

  componentDidMount() {
    this.executePageQuery();
    // console.log(this.props.location.search);
  }

  /**
   * Execute page query, process the response and set the state
   */
  executePageQuery = async () => {
    try{
    const parsed = QueryString.parse(this.props.location.search);
    const { client } = this.props;
    let uri = parsed.s;
    if (!uri) {
      uri = 'welcome';
    }
    const result = await client.query({
      query: PAGE_QUERY,
      variables: { uri },
    });
    const page = result.data.pageBy;
    this.setState({ page });
    this.setState({ isLoading: false });
    }catch(error){
      this.setState({ isError: true });
      console.log(error);
    }
  };

  render() {
    const { page, isLoading, isError } = this.state;
    return (
      <div>
        {/* <div className="pa2">
          <h1>{page.title}</h1>
        </div> */}
        {
          isLoading?<PageLoader/>:      
            <div
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: page.content,
              }}
            />
        }

        {isError?<Redirect to="/404" />:<div/>}
      
      
      </div>
    );
  }
}

export default withApollo(Page);
