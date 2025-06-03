import React from "react";

import { render, waitFor, fireEvent } from "@testing-library/react-native";
import { router } from "expo-router";
import { Alert } from "react-native";

import GrazingForm from "../../../../app/(tabs)/(maps)/grazing-form";
import { getGroupNames, getFieldNames, getGroupIdByName } from "../../../../model/grazing";

jest.mock("../../../../store/user-provider", () => ({
  useUser: jest.fn(() => ({
    user: { id: "1", name: "TestUser", email: "test@test.com" },
  })),
}));

jest.mock("../../../../model/grazing", () => ({
  getGroupNames: jest.fn(),
  getFieldNames: jest.fn(),
  getGroupIdByName: jest.fn(),
  getFieldIdByName: jest.fn(),
  insertGrazing: jest.fn(),
}));

jest.mock("expo-router", () => ({
  router: {
    replace: jest.fn(),
  },
}));

jest.mock("@fortawesome/react-native-fontawesome", () => ({
  FontAwesomeIcon: () => null,
}));

jest.spyOn(Alert, "alert");

describe("GrazingForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", async () => {
    getGroupNames.mockResolvedValue(["TestGroup"]);
    getFieldNames.mockResolvedValue(["TestField"]);
    const tree = render(<GrazingForm />);
    await waitFor(() => expect(tree).toMatchSnapshot());
  });

  it("should navigate to grazing", async () => {
    getGroupNames.mockResolvedValue(["TestGroup"]);
    getFieldNames.mockResolvedValue(["TestField"]);
    const tree = render(<GrazingForm />);
    await waitFor(() => expect(tree).toMatchSnapshot());
    const grazingButton = tree.getByTestId("grazing-button");
    fireEvent.press(grazingButton);
    await waitFor(() => expect(router.replace).toHaveBeenCalledWith("grazing"));
  });

  it("should show an error if group is empty", async () => {
    getGroupNames.mockResolvedValue([]);
    getFieldNames.mockResolvedValue(["TestField"]);
    const { getByTestId } = render(<GrazingForm />);
    await waitFor(() => expect(getGroupNames).toHaveBeenCalled());
    fireEvent(getByText("Fincas:"), "onValueChange", "TestField");
    const handleAddGrazingButton = getByTestId("handle-add-grazing-button");
    fireEvent.press(handleAddGrazingButton);
    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "Por favor, rellena todos los campos."
    );
  });

  it("should show an error if field is empty", async () => {
    getGroupNames.mockResolvedValue(["TestGroup"]);
    getFieldNames.mockResolvedValue([]);
    const { getByTestId, getByText } = render(<GrazingForm />);
    await waitFor(() => expect(getFieldNames).toHaveBeenCalled());
    fireEvent(getByText("Grupos:"), "onValueChange", "TestGroup");
    const handleAddGrazingButton = getByTestId("handle-add-grazing-button");
    fireEvent.press(handleAddGrazingButton);
    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "Por favor, rellena todos los campos."
    );
  });

  it("should work with valid submission", async () => {
    getGroupNames.mockResolvedValue(["TestGroup"]);
    getFieldNames.mockResolvedValue(["TestField"]);
    const { getByTestId, getByText } = render(<GrazingForm />);
    await waitFor(() => expect(getFieldNames).toHaveBeenCalled());
    fireEvent(getByText("Grupos:"), "onValueChange", "TestGroup");
    fireEvent(getByText("Fincas:"), "onValueChange", "TestField");
    const handleAddGrazingButton = getByTestId("handle-add-grazing-button");
    fireEvent.press(handleAddGrazingButton);
    await waitFor(() => {
      expect(router.replace).toHaveBeenCalledWith("grazing");
    });
  });

});