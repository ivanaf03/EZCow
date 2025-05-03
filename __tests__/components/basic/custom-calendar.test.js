import React from "react";

import { render, fireEvent } from "@testing-library/react-native";

import CustomCalendar from "../../../components/basic/custom-calendar";

describe("CustomCalendar", () => {
  const mockDate = new Date("2000-01-01");

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    const tree = render(
      <CustomCalendar text="Test" date={mockDate} onChange={jest.fn()} />
    );
    expect(tree).toMatchSnapshot();
  });

  it("should show the calendar when clicking on the button", () => {
    const onChange = jest.fn();
    const tree = render(
      <CustomCalendar text="Test" date={mockDate} onChange={onChange} />
    );
    const button = tree.getByTestId("date-picker-button");
    fireEvent.press(button);
    expect(tree.getByTestId("calendar")).not.toBeNull();
  });
});
