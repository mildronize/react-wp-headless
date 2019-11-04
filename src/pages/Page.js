import React, { Component } from 'react';
import { withApollo } from 'react-apollo';
import gql from 'graphql-tag';
import { PageLoader } from '../components/Loaders';

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
    isLoading: true
  };

  componentDidMount() {
    this.executePageQuery();
  }

  /**
   * Execute page query, process the response and set the state
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
    this.setState({ isLoading: false });
  };

  render() {
    const { page, isLoading } = this.state;
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
      </div>
    );
  }
}

export default withApollo(Page);
