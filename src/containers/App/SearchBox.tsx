/* eslint-disable jsx-a11y/label-has-associated-control */
import { ChangeEvent } from "react";

function SearchBox({
  totalCount,
  pageCount,
  queryString,
  onPageCountChange,
  onQueryChange,
}: {
  totalCount: number;
  pageCount: number;
  queryString: string;
  onPageCountChange: (f: ChangeEvent<HTMLInputElement>) => void;
  onQueryChange: (f: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <p>
      <form>
        <label htmlFor="search">Search github: </label>
        <input
          id="search"
          type="text"
          placeholder="Search github repositories"
          value={queryString}
          onChange={onQueryChange}
          style={{ border: "1px solid black" }}
        />
        <br />
        <label htmlFor="total">Set total repositories: </label>
        <input
          id="total"
          type="number"
          placeholder="Set number of repositories per page"
          min="1"
          max="100"
          value={pageCount}
          onChange={onPageCountChange}
          style={{ border: "1px solid black" }}
        />
      </form>
      <b>Search for:</b> {queryString} | <b>Items per page:</b> {pageCount} |{" "}
      <b>Total results:</b> {totalCount}
    </p>
  );
}

export default SearchBox;
