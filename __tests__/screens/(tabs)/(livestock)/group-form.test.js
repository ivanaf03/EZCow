import React from "react";

import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { router } from "expo-router";
import { Alert } from "react-native";

import GroupForm from "../../../../app/(tabs)/(livestock)/group-form";
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

describe("GroupForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", async () => {
    const tree = render(<GroupForm />);
    expect(tree).toMatchSnapshot();
  });

  it("should show an error if name is empty", async () => {
    const { getByTestId } = render(<GroupForm />);

    const handleAddGroupButton = getByTestId("handle-add-group-button");
    fireEvent.press(handleAddGroupButton);

    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "Por favor, rellena todos los campos."
    );
  });

  it("should call insertGroup on valid submission", async () => {
    const { getByPlaceholderText, getByTestId } = render(<GroupForm />);

    fireEvent.changeText(getByPlaceholderText("Nombre"), "Grupo Test");
    fireEvent.press(getByTestId("handle-add-group-button"));

    await waitFor(() => {
      expect(insertGroup).toHaveBeenCalledWith("Grupo Test");
      expect(router.replace).toHaveBeenCalledWith("livestock");
    });
  });

  it("should navigate to livestock when pressing livestock button", async () => {
    const { getByTestId } = render(<GroupForm />);
    const handleAddGroupButton = getByTestId("livestock-button");
    fireEvent.press(handleAddGroupButton);
    expect(router.replace).toHaveBeenCalledWith("livestock");
  });
});
