const NavButtons = ({
  start,
  end,
  next,
  previous,
  onPage,
}: {
  start: string;
  end: string;
  next: boolean;
  previous: boolean;
  onPage: (f1: string, f2: string) => void;
}) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {(previous && (
        <button onClick={() => onPage("last", `before: "${start}"`)}>
          prev
        </button>
      )) || <div />}
      {next && (
        <button onClick={() => onPage("first", `after: "${end}"`)}>next</button>
      )}
    </div>
  );
};

export default NavButtons;
