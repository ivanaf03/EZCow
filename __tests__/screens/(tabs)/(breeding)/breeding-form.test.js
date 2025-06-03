import React from "react";

import { render, fireEvent, waitFor } from "@testing-library/react-native";
import { router } from "expo-router";
import { Alert } from "react-native";

import BreedingForm from "../../../../app/(tabs)/(breeding)/breeding-form";
import { getAllCowIdsAndNamesAvailableByUserId } from "../../../../model/cow";
import { insertBreedingEvent } from "../../../../model/breeding-events";

jest.mock("../../../../model/breeding-events", () => ({
  insertBreedingEvent: jest.fn(),
}));

jest.mock("../../../../model/cow", () => ({
  getAllCowIdsAndNamesAvailableByUserId: jest.fn(),
}));

jest.mock("../../../../store/user-provider", () => ({
  useUser: jest.fn(() => ({
    user: { id: "1", name: "TestUser", email: "test@test.com" },
  })),
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

describe("BreedingForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getAllCowIdsAndNamesAvailableByUserId.mockResolvedValue([
      { id: "1", name: "Vaca 1" },
      { id: "2", name: "Vaca 2" },
    ]);
  });

  it("should render correctly", async () => {
    const tree = render(<BreedingForm />);
    await waitFor(() => expect(tree).toMatchSnapshot());
  });

  it("should navigate to breeding when pressing add breeding event button", async () => {
    const { getByText, getByTestId, getByPlaceholderText } = render(<BreedingForm />);
    const addBreedingEventButton = getByTestId("handle-add-breed-button");
    await waitFor(() => expect(getAllCowIdsAndNamesAvailableByUserId).toHaveBeenCalled());
    fireEvent(getByText("Nombre de la vaca:"), "onValueChange", "Vaca 1");
    fireEvent(getByText("Tipo de evento:"), "onValueChange", "Celo");
    fireEvent.changeText(getByPlaceholderText("Descripción"), "Esto es una prueba");
    fireEvent.press(addBreedingEventButton);
    await waitFor(() => expect(insertBreedingEvent).toHaveBeenCalledWith(
      "1",
      "Celo",
      "Esto es una prueba",
      expect.stringMatching(/\d{4}-\d{2}-\d{2}/)
    ));
    await waitFor(() => expect(router.replace).toHaveBeenCalledWith("breeding"));
  });

  it("should show an error if fields are empty", async () => {
    const { getByText, getByTestId } = render(<BreedingForm />);
    const addBreedingEventButton = getByTestId("handle-add-breed-button");
    await waitFor(() => expect(getAllCowIdsAndNamesAvailableByUserId).toHaveBeenCalled());
    fireEvent(getByText("Nombre de la vaca:"), "onValueChange", "Vaca 1");
    fireEvent(getByText("Tipo de evento:"), "onValueChange", "Celo");
    fireEvent.press(addBreedingEventButton);
    await waitFor(() => expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "Por favor, rellena todos los campos."
    ));
  });

});
