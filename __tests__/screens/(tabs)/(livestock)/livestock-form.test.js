import React from "react";

import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { router } from "expo-router";
import { Alert } from "react-native";

import LivestockForm from "../../../../app/(tabs)/(livestock)/livestock-form";
import {
  insertCow,
  getAvailableCowCodeByUserId,
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

jest.mock("../../../../model/cow", () => ({
  insertCow: jest.fn(),
  getAvailableCowCodeByUserId: jest.fn(() => ["1234", "5678"]),
  getCowIdByCode: jest.fn(() => "ES1234"),
}));

jest.mock("@fortawesome/react-native-fontawesome", () => ({
  FontAwesomeIcon: () => null,
}));

jest.spyOn(Alert, "alert");

describe("LivestockForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", async () => {
    const tree = render(<LivestockForm />);
    await waitFor(() => expect(getAvailableCowCodeByUserId).toHaveBeenCalled());
    expect(tree).toMatchSnapshot();
  });

  it("should show an error if fields are empty", async () => {
    const { getByTestId } = render(<LivestockForm />);
    await waitFor(() => expect(getAvailableCowCodeByUserId).toHaveBeenCalled());
    const handleAddCowButton = getByTestId("handle-add-cow-button");
    fireEvent.press(handleAddCowButton);
    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "Por favor, rellena todos los campos."
    );
  });

  it("should show an error if code is empty", async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <LivestockForm />
    );
    await waitFor(() => expect(getAvailableCowCodeByUserId).toHaveBeenCalled());

    fireEvent.changeText(getByPlaceholderText("Nombre"), "Vaca Test");
    fireEvent.changeText(getByPlaceholderText("Raza"), "Holstein");
    fireEvent(getByText("Género:"), "onValueChange", "Femenino");
    fireEvent(getByText("Madre:"), "onValueChange", "1234");
    fireEvent(getByText("Fase:"), "onValueChange", "Ternero");

    const handleAddCowButton = getByTestId("handle-add-cow-button");
    fireEvent.press(handleAddCowButton);

    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "Por favor, rellena todos los campos."
    );
  });

  it("should show an error if name is empty", async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <LivestockForm />
    );
    await waitFor(() => expect(getAvailableCowCodeByUserId).toHaveBeenCalled());

    fireEvent.changeText(getByPlaceholderText("Código"), "COW001");
    fireEvent.changeText(getByPlaceholderText("Raza"), "Holstein");
    fireEvent(getByText("Género:"), "onValueChange", "Femenino");
    fireEvent(getByText("Madre:"), "onValueChange", "1234");
    fireEvent(getByText("Fase:"), "onValueChange", "Ternero");

    const handleAddCowButton = getByTestId("handle-add-cow-button");
    fireEvent.press(handleAddCowButton);

    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "Por favor, rellena todos los campos."
    );
  });

  it("should show an error if breed is empty", async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <LivestockForm />
    );
    await waitFor(() => expect(getAvailableCowCodeByUserId).toHaveBeenCalled());

    fireEvent.changeText(getByPlaceholderText("Código"), "COW001");
    fireEvent.changeText(getByPlaceholderText("Nombre"), "Vaca Test");
    fireEvent(getByText("Género:"), "onValueChange", "Femenino");
    fireEvent(getByText("Madre:"), "onValueChange", "1234");
    fireEvent(getByText("Fase:"), "onValueChange", "Ternero");

    const handleAddCowButton = getByTestId("handle-add-cow-button");
    fireEvent.press(handleAddCowButton);

    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "Por favor, rellena todos los campos."
    );
  });

  it("should call insertCow on valid submission", async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <LivestockForm />
    );
    await waitFor(() => expect(getAvailableCowCodeByUserId).toHaveBeenCalled());

    fireEvent.changeText(getByPlaceholderText("Código"), "COW001");
    fireEvent.changeText(getByPlaceholderText("Nombre"), "Vaca Test");
    fireEvent.changeText(getByPlaceholderText("Raza"), "Holstein");
    fireEvent(getByText("Género:"), "onValueChange", "Femenino");
    fireEvent(getByText("Madre:"), "onValueChange", "1234");
    fireEvent(getByText("Fase:"), "onValueChange", "Ternero");

    fireEvent.press(getByTestId("handle-add-cow-button"));

    await waitFor(() => {
      expect(insertCow).toHaveBeenCalledWith(
        "COW001",
        "Vaca Test",
        expect.stringMatching(/\d{4}-\d{2}-\d{2}/),
        "Femenino",
        "Holstein",
        "Ternero",
        "1",
        "ES1234"
      );
      expect(router.replace).toHaveBeenCalledWith("livestock");
    });
  });

  it("should navigate to livestock when pressing livestock button", async () => {
    const { getByTestId } = render(<LivestockForm />);
    await waitFor(() => expect(getAvailableCowCodeByUserId).toHaveBeenCalled());
    const handleAddCowButton = getByTestId("livestock-button");
    fireEvent.press(handleAddCowButton);
    expect(router.replace).toHaveBeenCalledWith("livestock");
  });
});
