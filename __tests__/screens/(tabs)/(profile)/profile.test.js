import React from "react";

import { render } from "@testing-library/react-native";

import Profile from "../../../../app/(tabs)/(profile)/profile";

jest.mock("../../../../store/user-provider", () => ({
  useUser: jest.fn(() => ({
    user: { id: "1", name: "TestUser", email: "test@test.com" },
  })),
}));

jest.mock("@fortawesome/react-native-fontawesome", () => ({
  FontAwesomeIcon: () => null,
}));

jest.mock("");

jest.mock("../../../../store/user-provider", () => ({
  useUser: jest.fn(() => ({
    user: {
      id: "1",
      name: "TestUser",
      email: "test@test.com",
      password: "test1234",
    },
  })),
}));

describe("Profile", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", async () => {
    const tree = render(<Profile />);
    expect(tree).toMatchSnapshot();
  });
});
