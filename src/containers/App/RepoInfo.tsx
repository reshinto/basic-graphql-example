/* eslint-disable @typescript-eslint/no-explicit-any */
function RepoInfo({
  repoList,
}: {
  repoList: {
    [k: string]: any;
  }[];
}) {
  return (
    <ul>
      {repoList.map(repo => (
        <li key={repo?.id?.toString() || repo?.node.id}>
          <a
            href={repo?.url || repo?.node.url}
            target="_blank"
            rel="noreferrer"
          >
            {repo?.name || repo?.node.name}
          </a>
          <p>{repo?.description || repo?.node?.description}</p>
        </li>
      ))}
    </ul>
  );
}

export default RepoInfo;
