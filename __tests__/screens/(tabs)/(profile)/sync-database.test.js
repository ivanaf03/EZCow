import React from "react";

import { render, fireEvent } from "@testing-library/react-native";
import { Alert } from "react-native";

import SyncDatabase from "../../../../app/(tabs)/(profile)/sync-database";

jest.mock("@fortawesome/react-native-fontawesome", () => ({
  FontAwesomeIcon: () => null,
}));

jest.mock("../../../../app/model/users", () => ({
  getUserByEmail: jest.fn(),
}));

jest.mock("../../../../app/model/bd", () => ({
  closeDatabase: jest.fn(),
  syncDatabase: jest.fn(),
  getDatabase: jest.fn(),
}));

jest.spyOn(Alert, "alert");

describe("SyncDatabase", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", async () => {
    const tree = render(<SyncDatabase />);
    expect(tree).toMatchSnapshot();
  });

  it("should show an error if device name is empty", async () => {
    const { getByPlaceholderText, getByTestId } = render(<SyncDatabase />);
    const deviceNameInput = getByPlaceholderText("Nombre del dispositivo");
    fireEvent.changeText(deviceNameInput, "");
    const passwordInput = getByPlaceholderText("Contraseña");
    fireEvent.changeText(passwordInput, "12345678");
    const syncDatabaseButton = getByTestId("sync-database-button");
    fireEvent.press(syncDatabaseButton);
    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "Por favor, rellena todos los campos."
    );
  });

  it("should show an error if password is empty", async () => {
    const { getByPlaceholderText, getByTestId } = render(<SyncDatabase />);
    const deviceNameInput = getByPlaceholderText("Nombre del dispositivo");
    fireEvent.changeText(deviceNameInput, "TestDevice");
    const passwordInput = getByPlaceholderText("Contraseña");
    fireEvent.changeText(passwordInput, "");
    const syncDatabaseButton = getByTestId("sync-database-button");
    fireEvent.press(syncDatabaseButton);
    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "Por favor, rellena todos los campos."
    );
  });

  it("should show an error if password is less than 8 characters", async () => {
    const { getByPlaceholderText, getByTestId } = render(<SyncDatabase />);
    const deviceNameInput = getByPlaceholderText("Nombre del dispositivo");
    fireEvent.changeText(deviceNameInput, "TestDevice");
    const passwordInput = getByPlaceholderText("Contraseña");
    fireEvent.changeText(passwordInput, "1234567");
    const syncDatabaseButton = getByTestId("sync-database-button");
    fireEvent.press(syncDatabaseButton);
    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "La contraseña debe tener al menos 8 caracteres."
    );
  });
});
