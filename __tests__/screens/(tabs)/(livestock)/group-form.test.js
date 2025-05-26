import React from "react";

import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { router } from "expo-router";
import { Alert } from "react-native";

import GroupForm from "../../../../app/(tabs)/(livestock)/group-form";
import {
  insertGroup,
  insertCowInGroup,
  getGroupIdByName,
} from "../../../../model/grazing";

import {
  getAvailableCodeByUserId,
  getCowIdByCode,
} from "../../../../model/cow";

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
  insertCowInGroup: jest.fn(),
  getGroupIdByName: jest.fn(),
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

describe("GroupForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", async () => {
    getAvailableCodeByUserId.mockResolvedValueOnce([]);
    const tree = render(<GroupForm />);
    expect(tree).toMatchSnapshot();
  });

  it("should show an error if name is empty", async () => {
    getAvailableCodeByUserId.mockResolvedValueOnce([]);
    const { getByTestId } = render(<GroupForm />);
    fireEvent.press(getByTestId("handle-add-group-button"));
    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "Por favor, rellena todos los campos."
    );
  });

  it("should show an error if no cows are added", async () => {
    getAvailableCodeByUserId.mockResolvedValueOnce([]);
    const { getByTestId, getByPlaceholderText } = render(<GroupForm />);
    fireEvent.changeText(getByPlaceholderText("Nombre"), "Grupo Test");
    fireEvent.press(getByTestId("handle-add-group-button"));
    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "Por favor, añade al menos una vaca."
    );
  });

  it("should navigate to livestock when pressing livestock button", async () => {
    getAvailableCodeByUserId.mockResolvedValueOnce([]);
    const { getByTestId } = render(<GroupForm />);
    fireEvent.press(getByTestId("livestock-button"));
    expect(router.replace).toHaveBeenCalledWith("livestock");
  });

  it("should add a cow to a group when pressing add button", async () => {
    const { getByTestId, getByPlaceholderText } = render(<GroupForm />);

    await waitFor(() => expect(getAvailableCodeByUserId).toHaveBeenCalled());
    getCowIdByCode.mockResolvedValueOnce("1");
    getGroupIdByName.mockResolvedValueOnce(1);

    fireEvent.changeText(getByPlaceholderText("Nombre"), "Grupo Test 1");
    fireEvent(getByTestId("cow-picker"), "onValueChange", "1234");
    fireEvent.press(getByTestId("add-cow-button"));
    await waitFor(() => {
      expect(getCowIdByCode).toHaveBeenCalledWith("1234");
    });
    fireEvent.press(getByTestId("handle-add-group-button"));

    await waitFor(() => {
      expect(insertCowInGroup).toHaveBeenCalledWith("1", 1);
      expect(insertGroup).toHaveBeenCalledWith("Grupo Test 1");
      expect(router.replace).toHaveBeenCalledWith("livestock");
    });
  });
});
