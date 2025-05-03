import React from "react";

import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { router } from "expo-router";

import Breeding from "../../../../app/(tabs)/(breeding)/breeding";

jest.mock("../../../../app/model/breeding-events", () => ({
  getBreedingEventsByDayAnUserId: jest.fn(() => []),
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

describe("Breeding", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", async () => {
    const tree = render(<Breeding />);
    await waitFor(() => expect(tree).toMatchSnapshot());
  });

  it("should change the date when pressing the calendar", async () => {
    const tree = render(<Breeding />);
    const calendarButton = tree.getByTestId("date-picker-button");
    fireEvent.press(calendarButton);
    const today = new Date().toLocaleDateString("es-ES");
    const highlightedDate = tree.getAllByText(today)[1];
    expect(highlightedDate).toBeTruthy();
  });

  it("should navigate to breeding-form when pressing breeding-form button", async () => {
    const tree = render(<Breeding />);
    const breedingFormButton = tree.getByTestId("breeding-form-button");
    fireEvent.press(breedingFormButton);
    expect(router.push).toHaveBeenCalledWith("breeding-form");
  });
}); 