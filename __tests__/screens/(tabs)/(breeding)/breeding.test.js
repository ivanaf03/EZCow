import React from "react";

import { render, waitFor } from "@testing-library/react-native";

import Breeding from "../../../../app/(tabs)/(breeding)/breeding";

jest.mock("../../../../model/breeding-events", () => ({
  getBreedingEventsByDayAnUserId: jest.fn(() => []),
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
    const tree = render(<Breeding />);
    await waitFor(() => expect(tree).toMatchSnapshot());
  });

});