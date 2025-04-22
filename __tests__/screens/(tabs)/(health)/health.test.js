import React from "react";

import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { router } from "expo-router";

import Health from "../../../../app/(tabs)/(health)/health";

jest.mock("../../../../app/model/health-events", () => ({
  getHealthEventsByDayAnUserId: jest.fn(() => []),
}));

jest.mock("../../../../hooks/providers/user-provider", () => ({
    useUser: jest.fn(() => ({
        user: {id: "1", name: "TestUser", email: "test@test.com"},
    })),
}));

jest.mock("expo-router", () => ({
  router: {
    push: jest.fn(),
  },
  useFocusEffect: jest.fn(),
}));

describe("Health", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", async () => {
    const tree = render(<Health />);
    await waitFor(() => expect(tree).toMatchSnapshot());
  });

  it("should change the date when pressing the calendar", async () => {
    const tree = render(<Health />);
    const calendarButton = tree.getByTestId("date-picker-button");
    fireEvent.press(calendarButton);
    const today = new Date().toLocaleDateString("es-ES");
    const highlightedDate = tree.getAllByText(today)[1];
    expect(highlightedDate).toBeTruthy();
  });

  it("should navigate to health-form when pressing health-form button", async () => {
    const tree = render(<Health />);
    const healthFormButton = tree.getByTestId("health-form-button");
    fireEvent.press(healthFormButton);
    expect(router.push).toHaveBeenCalledWith("health-form");
  });
});