import React from "react";

import { render, waitFor } from "@testing-library/react-native";

import Health from "../../../../app/(tabs)/(health)/health";

jest.mock("../../../../model/health-events", () => ({
  getHealthEventsByDayAnUserId: jest.fn(() => []),
}));

jest.mock("../../../../store/user-provider", () => ({
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

jest.mock("@fortawesome/react-native-fontawesome", () => ({
  FontAwesomeIcon: () => null,
}));

describe("Health", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", async () => {
    const tree = render(<Health />);
    await waitFor(() => expect(tree).toMatchSnapshot());
  });

});