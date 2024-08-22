import { render, screen, fireEvent } from "@testing-library/react";
import AddNumbersComponent from "../Components/AddNumbersComponent";

test("renders input and button", () => {
  render(<AddNumbersComponent />);
  expect(screen.getByPlaceholderText("Enter numbers")).toBeInTheDocument();
  expect(screen.getByText("Calculate Sum")).toBeInTheDocument();
});

test("calculates sum correctly", () => {
  render(<AddNumbersComponent />);
  const input = screen.getByPlaceholderText("Enter numbers");
  const button = screen.getByText("Calculate Sum");

  fireEvent.change(input, { target: { value: "1,2,3" } });
  fireEvent.click(button);

  expect(screen.getByText("Result: 6")).toBeInTheDocument();
});

test("displays error message for negative numbers", () => {
  render(<AddNumbersComponent />);
  const input = screen.getByPlaceholderText("Enter numbers");
  const button = screen.getByText("Calculate Sum");

  fireEvent.change(input, { target: { value: "1,-2,3,-4" } });
  fireEvent.click(button);

  expect(
    screen.getByText("Negative numbers not allowed: -2, -4")
  ).toBeInTheDocument();
});

test("clears result when error occurs", () => {
  render(<AddNumbersComponent />);
  const input = screen.getByPlaceholderText("Enter numbers");
  const button = screen.getByText("Calculate Sum");

  // First, enter a valid input
  fireEvent.change(input, { target: { value: "1,2,3" } });
  fireEvent.click(button);
  expect(screen.getByText("Result: 6")).toBeInTheDocument();

  // Then, enter an invalid input
  fireEvent.change(input, { target: { value: "1,-2,3,-4" } });
  fireEvent.click(button);
  expect(screen.queryByText("Result: 6")).not.toBeInTheDocument();
});
