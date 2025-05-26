import React from "react";

import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { router } from "expo-router";
import { Alert } from "react-native";

import GroupCard from "../../../../app/(tabs)/(livestock)/group-card";
import { insertGroup } from "../../../../model/grazing";

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
}));

jest.mock("@fortawesome/react-native-fontawesome", () => ({
  FontAwesomeIcon: () => null,
}));

jest.spyOn(Alert, "alert");

describe("GroupCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", async () => {
    const tree = render(<GroupCard group={{groupId: 1, groupName: "TestGroup"}} onDelete={jest.fn()} />);
    await waitFor(() => expect(tree).toMatchSnapshot());
  });

  it("should call onDelete when pressing delete button", async () => {
    const onDelete = jest.fn();
    const { getByTestId } = render(<GroupCard group={{groupId: 1, groupName: "TestGroup"}} onDelete={onDelete} />);
    await waitFor(() => expect(getByTestId("delete-group-button")).toBeTruthy());
    const handleDeleteGroupButton = getByTestId("delete-group-button");
    fireEvent.press(handleDeleteGroupButton);
    expect(onDelete).toHaveBeenCalledWith({groupId: 1, groupName: "TestGroup"});
  });
});