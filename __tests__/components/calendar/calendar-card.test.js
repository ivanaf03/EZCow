import React from "react";

import { render } from "@testing-library/react-native";

import CalendarCard from "../../../components/calendar/calendar-card";

describe("CalendarCard", () => {
  it("should render correctly", () => {
    const tree = render(
      <CalendarCard date="2022-01-01" events={[]} isSelected={false} />
    );

    expect(tree).toMatchSnapshot();
  });

  it("should render correctly when selected", () => {
    const tree = render(
      <CalendarCard date="2022-01-01" events={[]} isSelected={true} />
    );

    expect(tree).toMatchSnapshot();
  });

  it("should render correctly with events", () => {
    const tree = render(
      <CalendarCard date="2022-01-01" events={[{ name: "test", description: "test" }]} isSelected={false} />
    );

    expect(tree).toMatchSnapshot();
  });
});