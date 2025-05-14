import React from "react";

import { render, fireEvent } from "@testing-library/react-native";
import { router } from "expo-router";

import EventCalendar from "../../../components/calendar/event-calendar";

jest.mock("@fortawesome/react-native-fontawesome", () => ({
  FontAwesomeIcon: () => null,
}));

jest.mock("../../../store/user-provider", () => ({
  useUser: jest.fn(() => ({
    user: { id: "1", name: "TestUser", email: "test@test.com" },
  })),
}));

jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
  useFocusEffect: jest.fn(),
}));

describe("EventCalendar", () => {
  it("should render correctly", () => {
    const tree = render(
      <EventCalendar
        title="test"
        buttonText="test"
        formRoute="test"
        fetchEventsFunction={() => []}
      />
    );

    expect(tree).toMatchSnapshot();
  });

  it("should render correctly with events", () => {
    const tree = render(
      <EventCalendar
        title="test"
        buttonText="test"
        formRoute="test"
        fetchEventsFunction={() => [{ name: "test", description: "test" }]}
      />
    );

    expect(tree).toMatchSnapshot();
  });

  it("should render correctly with events and selected date", () => {
    const tree = render(
      <EventCalendar
        title="test"
        buttonText="test"
        formRoute="test"
        fetchEventsFunction={() => [{ name: "test", description: "test" }]}
        date={new Date()}
      />
    );

    expect(tree).toMatchSnapshot();
  });

    it("should change the date when pressing the calendar", async () => {
    const tree = render(
      <EventCalendar
        title="test"
        buttonText="test"
        formRoute="test"
        fetchEventsFunction={() => [{ name: "test", description: "test" }]}
      />
    );
    const calendarButton = tree.getByTestId("date-picker-button");
    fireEvent.press(calendarButton);
    const today = new Date().toLocaleDateString("es-ES");
    const highlightedDate = tree.getAllByText(today)[1];
    expect(highlightedDate).toBeTruthy();
  });

  it("should navigate to the correct screen when pressing the button", async () => {
    const tree = render(
      <EventCalendar
        title="test"
        buttonText="test"
        formRoute="route"
        fetchEventsFunction={() => [{ name: "test", description: "test" }]}
      />
    );
    const button = tree.getByTestId("route-button");
    fireEvent.press(button);
    expect(router.push).toHaveBeenCalledWith("route");
  });   
});
