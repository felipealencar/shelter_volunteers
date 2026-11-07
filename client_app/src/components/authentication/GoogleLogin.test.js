import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./GoogleLogin";

jest.mock("@react-oauth/google", () => ({
  GoogleLogin: () => <button type="button">Sign in with Google</button>,
}));
jest.mock("../../contexts/AuthContext", () => ({
  useAuth: () => ({ login: jest.fn() }),
}));
jest.mock("../ShelterMap", () => () => <div data-testid="shelter-map" />);

test("identifies House Everyone STL while keeping Volunteer Connect branding and sign-in", () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );

  const homeLink = screen.getByRole("link", {
    name: "Volunteer Connect, House Everyone STL home",
  });
  expect(within(homeLink).getByText("Volunteer Connect")).toBeInTheDocument();
  expect(within(homeLink).getByText("House Everyone STL")).toBeInTheDocument();
  expect(screen.getByText(/Volunteer Connect helps House Everyone STL/)).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Sign in with Google" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Sign in with email and password" }))
    .toHaveAttribute("href", "/admin-login");
  expect(screen.getByTestId("shelter-map")).toBeInTheDocument();
});
