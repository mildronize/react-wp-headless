// graphql api url
let url = 'https://host.mildronize.com/?graphql';

// If we're running on Docker, use the WordPress container hostname instead of localhost.
// if (process.env.HOME === '/home/node') {
//   url = 'http://wp-headless:8080/graphql';
// }
const Config = {
  gqlUrl: url,
  wpUrl: "https://host.mildronize.com/wp-json",
  timezone: 'Asia/Bangkok'
};

export default Config;
