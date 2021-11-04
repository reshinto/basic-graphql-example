import { render } from "@testing-library/react";
import App from "./index";

xtest("renders learn react link", () => {
  const { getByText } = render(<App />);

  expect(getByText(/App/i)).toBeInTheDocument();
});
