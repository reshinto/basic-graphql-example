/* eslint-disable no-console */
import { useEffect, useState, useCallback, ChangeEvent } from "react";
import github from "../../db";
import NavButtons from "./NavButtons";
import {
  githubRepoQuery,
  githubSearchQuery,
  githubSearchQueryWithPagination,
  githubUsernameQuery,
} from "./Query";
import RepoInfo from "./RepoInfo";
import SearchBox from "./SearchBox";
import "./styles.css";

function App() {
  const [userName, setUserName] = useState<string>("");
  const [repoList, setRepoList] = useState<{ [k: string]: string }[]>([]);
  const [queryString, setQueryString] = useState<string>("");
  const [pageCount, setPageCount] = useState<number>(10);
  const [totalCount, setTotalCount] = useState<number>(1);

  const [startCursor, setStartCursor] = useState<string>("");
  const [endCursor, setEndCursor] = useState<string>("");
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [hasPreviousPage, setHasPreviousPage] = useState<boolean>(false);
  const [paginationKeyword, setPaginationKeyword] = useState<string>("first");
  const [paginationString, setPaginationString] = useState<string>("");

  const handleQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQueryString(e.target.value);
  };

  const handlePageCountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPageCount(parseInt(e.target.value, 10) || 1);
  };

  const fetchUsername = useCallback(() => {
    fetch(github.baseURL, {
      method: "POST",
      headers: github.headers,
      body: JSON.stringify(githubUsernameQuery),
    })
      .then(response => response.json())
      .then(({ data }) => {
        const { name } = data.viewer;
        setUserName(name);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const fetchRepos = useCallback(() => {
    fetch(github.baseURL, {
      method: "POST",
      headers: github.headers,
      body: JSON.stringify(githubRepoQuery),
    })
      .then(response => response.json())
      .then(({ data }) => {
        const { repositories } = data?.viewer;
        console.log(repositories.nodes);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const searchData = useCallback(
    (user: string) => {
      fetch(github.baseURL, {
        method: "POST",
        headers: github.headers,
        body: JSON.stringify(githubSearchQuery(user, queryString, pageCount)),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.data.search.nodes);
          // const total = data.data.search.repositoryCount;
          // setRepoList(data.data.search.nodes);
          // setTotalCount(total);
        })
        .catch(err => {
          console.log(err);
        });
    },
    [queryString, pageCount],
  );

  const searchDataWithPagination = useCallback(
    (user: string) => {
      fetch(github.baseURL, {
        method: "POST",
        headers: github.headers,
        body: JSON.stringify(
          githubSearchQueryWithPagination(
            user,
            queryString,
            pageCount,
            paginationKeyword,
            paginationString,
          ),
        ),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.data.search.edges);
          const repos = data.data.search.edges;
          const total = data.data.search.repositoryCount;
          const start = data.data.search.pageInfo?.startCursor;
          const end = data.data.search.pageInfo?.endCursor;
          const next = data.data.search.pageInfo?.hasNextPage;
          const prev = data.data.search.pageInfo?.hasPreviousPage;
          setRepoList(repos);
          setTotalCount(total);
          setStartCursor(start);
          setEndCursor(end);
          setHasNextPage(next);
          setHasPreviousPage(prev);
        })
        .catch(err => {
          console.log(err);
        });
    },
    [queryString, pageCount, paginationKeyword, paginationString],
  );

  useEffect(() => {
    fetchUsername();
    fetchRepos();
    searchData("reshinto");
    searchDataWithPagination("reshinto");
  }, [fetchUsername, fetchRepos, searchData, searchDataWithPagination]);

  return (
    <div>
      <h1>{userName}</h1>
      <SearchBox
        totalCount={totalCount}
        pageCount={pageCount}
        queryString={queryString}
        onQueryChange={handleQueryChange}
        onPageCountChange={handlePageCountChange}
      />
      <NavButtons
        start={startCursor}
        end={endCursor}
        next={hasNextPage}
        previous={hasPreviousPage}
        onPage={(myKeyword: string, myString: string) => {
          setPaginationKeyword(myKeyword);
          setPaginationString(myString);
        }}
      />
      {repoList && <RepoInfo repoList={repoList} />}
    </div>
  );
}

export default App;
