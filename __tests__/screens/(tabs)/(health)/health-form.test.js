import React from "react";

import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { router } from "expo-router";
import { Alert } from "react-native";

import HealthForm from "../../../../app/(tabs)/(health)/health-form";
import { getAllCowIdsAndNamesAvailableByUserId } from "../../../../model/cow";
import { insertHealthEvent } from "../../../../model/health-events";

jest.mock("../../../../model/health-events", () => ({
  insertHealthEvent: jest.fn(),
}));

jest.mock("../../../../model/cow", () => ({
  getAllCowIdsAndNamesAvailableByUserId: jest.fn(),
}));

jest.mock("../../../../store/user-provider", () => ({
  useUser: jest.fn(() => ({
    user: { id: "1", name: "TestUser", email: "test@test.com" },
  })),
}));

jest.mock("@fortawesome/react-native-fontawesome", () => ({
  FontAwesomeIcon: () => null,
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

describe("HealthForm", () => {  
  beforeEach(() => {
    jest.clearAllMocks();
    getAllCowIdsAndNamesAvailableByUserId.mockResolvedValue([
      { id: "1", name: "Vaca 1" },
      { id: "2", name: "Vaca 2" },
    ]);
  });

  it("should render correctly", async () => {
    const tree = render(<HealthForm />);
    await waitFor(() => expect(tree).toMatchSnapshot());
  });

  it("should navigate to health when pressing add health event button", async () => {
    const { getByText, getByTestId, getByPlaceholderText } = render(<HealthForm />);
    const addHealthEventButton = getByTestId("handle-add-health-button");
    await waitFor(() => expect(getAllCowIdsAndNamesAvailableByUserId).toHaveBeenCalled());
    fireEvent(getByText("Nombre de la vaca:"), "onValueChange", "Vaca 1");
    fireEvent(getByText("Tipo de evento:"), "onValueChange", "Vacuna");
    fireEvent.changeText(getByPlaceholderText("Descripción"), "Esto es una prueba");
    fireEvent.press(addHealthEventButton);
    await waitFor(() => expect(insertHealthEvent).toHaveBeenCalledWith(
      "1",
      "Vacuna",
      "Esto es una prueba",
      expect.stringMatching(/\d{4}-\d{2}-\d{2}/)
    ));
    await waitFor(() => expect(router.replace).toHaveBeenCalledWith("health"));
  });

  it("should show an error if fields are empty", async () => {
    const { getByText, getByTestId } = render(<HealthForm />);
    const addHealthEventButton = getByTestId("handle-add-health-button");
    await waitFor(() => expect(getAllCowIdsAndNamesAvailableByUserId).toHaveBeenCalled());
    fireEvent(getByText("Nombre de la vaca:"), "onValueChange", "Vaca 1");
    fireEvent(getByText("Tipo de evento:"), "onValueChange", "Vacuna");
    fireEvent.press(addHealthEventButton);
    await waitFor(() => expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "Por favor, rellena todos los campos."
    ));
  });
}); 