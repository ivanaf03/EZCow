import React from "react";

import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { router } from "expo-router";
import { Alert } from "react-native";

import Groups from "../../../../app/(tabs)/(livestock)/groups";
import { getAllGroups } from "../../../../model/grazing";

jest.mock("expo-router", () => ({
  router: {
    replace: jest.fn(),
  },
}));

jest.mock("../../../../store/user-provider", () => ({
  useUser: jest.fn(() => ({
    user: { id: "1", name: "TestUser", email: "test@test.com" },
  })),
}));

jest.mock("../../../../model/grazing", () => ({
  getAllGroups: jest.fn(),
  deleteGroup: jest.fn(),
  insertGroup: jest.fn(),
  getCowsInGroup: jest.fn(),
  insertCowInGroup: jest.fn(),
}));

jest.mock("../../../../model/cow", () => ({
  getAvailableCodeByUserId: jest.fn(() => ["1234", "5678"]),
  getCowIdByCode: jest.fn(),
}));

jest.mock("@fortawesome/react-native-fontawesome", () => ({
  FontAwesomeIcon: () => null,
}));

jest.spyOn(Alert, "alert");

global.setImmediate = (fn, ...args) => setTimeout(fn, 0, ...args);

describe("Groups", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", async () => {
    getAllGroups.mockResolvedValueOnce([
      { groupId: 1, groupName: "TestGroup1" },
      { groupId: 2, groupName: "TestGroup2" },
    ]);
    const tree = render(<Groups />);
    await waitFor(() => expect(getAllGroups).toHaveBeenCalled());
    expect(tree).toMatchSnapshot();
  });

  it("should navigate to livestock when pressing livestock button", async () => {
    getAllGroups.mockResolvedValueOnce([
      { groupId: 1, groupName: "TestGroup1" },
      { groupId: 2, groupName: "TestGroup2" },
    ]);
    const { getByTestId } = render(<Groups />);
    await waitFor(() => expect(getAllGroups).toHaveBeenCalled());
    const handleAddGroupButton = getByTestId("livestock-button");
    fireEvent.press(handleAddGroupButton);
    expect(router.replace).toHaveBeenCalledWith("livestock");
  });
});
