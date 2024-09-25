import { getByPlaceholderText, render, screen } from "@testing-library/react";

import Input, { InputProps } from "./Input";
import userEvent from "@testing-library/user-event";

const renderComponent = (props: Partial<InputProps> = {}) => {
  return render(<Input {...props} />);
};

test("renders Input component by default", () => {
  renderComponent();

  const inputBox = screen.getByRole("textbox");

  expect(inputBox).not.toHaveAttribute("disabled");
  expect(screen.queryByPlaceholderText("")).not.toBeInTheDocument();
});

test("renders Input component with label", () => {
  renderComponent({ label: "test" });

  screen.getByText("test");
});

test("renders Input component with placeholder", () => {
  renderComponent({ placeholder: "placeholder text" });

  screen.getByPlaceholderText("placeholder text");
});

test("renders disabled Input component", () => {
  renderComponent({ isDisabled: true });

  const inputBox = screen.getByRole("textbox");
  expect(inputBox).toHaveAttribute("disabled");
});

test("update value when input", () => {
  const onChange = jest.fn();
  renderComponent({ onChange });

  const inputBox = screen.getByRole("textbox") as HTMLInputElement;

  expect(inputBox.value).toBe("");
  userEvent.paste(inputBox, "newValue");
  expect(onChange).toHaveBeenCalledWith("newValue");
  expect(inputBox.value).toBe("newValue");
});
