const github = {
  baseURL: "https://api.github.com/graphql",
  username: "reshinto",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
  },
};

export default github;
