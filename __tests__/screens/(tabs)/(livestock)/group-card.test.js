import React from "react";

import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { Alert } from "react-native";

import GroupCard from "../../../../app/(tabs)/(livestock)/group-card";
import {
  getAvailableCodeByUserId,
  getCowIdByCode,
} from "../../../../model/cow";

import { getCowsInGroup, insertCowInGroup } from "../../../../model/grazing";

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

describe("GroupCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", async () => {
    const tree = render(
      <GroupCard
        group={{ groupId: 1, groupName: "TestGroup" }}
        onDelete={jest.fn()}
      />
    );
    await waitFor(() => expect(getAvailableCodeByUserId).toHaveBeenCalled());
    await waitFor(() => expect(tree).toMatchSnapshot());
  });

  it("should call onDelete when pressing delete button", async () => {
    const onDelete = jest.fn();
    const { getByTestId } = render(
      <GroupCard
        group={{ groupId: 1, groupName: "TestGroup" }}
        onDelete={onDelete}
      />
    );

    const handleDeleteGroupButton = getByTestId("delete-group-button");
    fireEvent.press(handleDeleteGroupButton);
    await waitFor(() => expect(onDelete).toHaveBeenCalledWith({
      groupId: 1,
      groupName: "TestGroup"
    }));
  });

  it("should call insertCowInGroup when pressing add cow button", async () => {
    getCowsInGroup.mockResolvedValueOnce([]);
    getCowIdByCode.mockResolvedValueOnce("1");

    const { getByTestId } = render(
      <GroupCard
        group={{ groupId: 1, groupName: "TestGroup" }}
        onDelete={jest.fn()}
      />
    );

    await waitFor(() => expect(getAvailableCodeByUserId).toHaveBeenCalled());

    fireEvent(getByTestId("code-picker-1"), "onValueChange", "1234");
    const handleAddCowButton = getByTestId("add-cow-button-1");
    fireEvent.press(handleAddCowButton);

    await waitFor(() => expect(getCowIdByCode).toHaveBeenCalledWith("1234"));
    await waitFor(() => {
      expect(insertCowInGroup).toHaveBeenCalledWith("1", 1);
    });
  });

  it("should show an error if cow is already in group", async () => {
    getCowsInGroup.mockResolvedValueOnce([
      { cowCode: "1234", groupId: 1, cowId: 1234, cowName: "Vaca Test" },
    ]);
    getCowIdByCode.mockResolvedValueOnce(1234);

    const { getByTestId } = render(
      <GroupCard
        group={{ groupId: 1, groupName: "TestGroup" }}
        onDelete={jest.fn()}
      />
    );

    await waitFor(() => expect(getAvailableCodeByUserId).toHaveBeenCalled());

    fireEvent(getByTestId("code-picker-1"), "onValueChange", "1234");
    const handleAddCowButton = getByTestId("add-cow-button-1");
    fireEvent.press(handleAddCowButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        "Error",
        "La vaca ya está en este grupo."
      );
    });

    await waitFor(() => expect(getCowIdByCode).not.toHaveBeenCalled());
  });
});
