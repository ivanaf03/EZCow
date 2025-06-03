import React from "react";

import { render, waitFor, fireEvent } from "@testing-library/react-native";
import { router } from "expo-router";

import CadastralFields from "../../../../app/(tabs)/(maps)/cadastral-fields";
import { getAllFieldsByUserId } from "../../../../model/field";
import { getUserCoordinatesById } from "../../../../model/users";
import { fetchCadastral } from "../../../../utils/map-cadastral-fetch";

jest.mock("../../../../store/user-provider", () => ({
  useUser: jest.fn(() => ({
    user: { id: "1", name: "TestUser", email: "test@test.com" },
  })),
}));

jest.mock("react-native-maps", () => {
  const React = require("react");
  const { View } = require("react-native");

  return {
    __esModule: true,
    default: (props) => React.createElement(View, props, props.children),
    Marker: (props) => React.createElement(View, props, props.children),
    Polygon: (props) => React.createElement(View, props, props.children),
  };
});

jest.mock("../../../../model/field", () => ({
  getAllFieldsByUserId: jest.fn(),
  deleteFieldById: jest.fn(),
}));

jest.mock("../../../../model/users", () => ({
  getUserCoordinatesById: jest.fn(),
}));

jest.mock("../../../../utils/map-cadastral-fetch", () => ({
  fetchCadastral: jest.fn(),
}));

jest.mock("expo-router", () => ({
  router: {
    replace: jest.fn(),
    push: jest.fn(),
  },
}));

jest.mock("@fortawesome/react-native-fontawesome", () => ({
  FontAwesomeIcon: () => null,
}));

describe("CadastralFields", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", async () => {
    getAllFieldsByUserId.mockResolvedValue([
      {
        id: 1,
        name: "TestField",
        cadastralReference: "12345678",
        latitude: 0,
        longitude: 0,
      },
    ]);
    getUserCoordinatesById.mockResolvedValue({ latitude: 0, longitude: 0 });
    fetchCadastral.mockResolvedValue([{ latitude: 0, longitude: 0 }]);
    const tree = render(<CadastralFields />);
    await waitFor(() => expect(tree).toMatchSnapshot());
  });

  it("should navigate to fields", async () => {
    getAllFieldsByUserId.mockResolvedValue([
      {
        id: 1,
        name: "TestField",
        cadastralReference: "12345678",
        latitude: 0,
        longitude: 0,
      },
    ]);
    getUserCoordinatesById.mockResolvedValue({ latitude: 0, longitude: 0 });
    fetchCadastral.mockResolvedValue([{ latitude: 0, longitude: 0 }]);
    const tree = render(<CadastralFields />);
    await waitFor(() => expect(tree).toMatchSnapshot());
    const fieldsButton = tree.getByTestId("fields-button");
    fireEvent.press(fieldsButton);
    await waitFor(() => expect(router.replace).toHaveBeenCalledWith("fields"));
  });

  it("should navigate to grazing", async () => {
    getAllFieldsByUserId.mockResolvedValue([
      {
        id: 1,
        name: "TestField",
        cadastralReference: "12345678",
        latitude: 0,
        longitude: 0,
      },
    ]);
    getUserCoordinatesById.mockResolvedValue({ latitude: 0, longitude: 0 });
    fetchCadastral.mockResolvedValue([{ latitude: 0, longitude: 0 }]);
    const tree = render(<CadastralFields />);
    await waitFor(() => expect(tree).toMatchSnapshot());
    const grazingButton = tree.getByTestId("grazing-button");
    fireEvent.press(grazingButton);
    await waitFor(() => expect(router.replace).toHaveBeenCalledWith("grazing"));
  });

  it("should navigate to add-fields", async () => {
    getAllFieldsByUserId.mockResolvedValue([
      {
        id: 1,
        name: "TestField",
        cadastralReference: "12345678",
        latitude: 0,
        longitude: 0,
      },
    ]);
    getUserCoordinatesById.mockResolvedValue({ latitude: 0, longitude: 0 });
    fetchCadastral.mockResolvedValue([{ latitude: 0, longitude: 0 }]);
    const tree = render(<CadastralFields />);
    await waitFor(() => expect(tree).toMatchSnapshot());
    const addFieldsButton = tree.getByText("Añadir con referencia catastral");
    fireEvent.press(addFieldsButton);
    await waitFor(() =>
      expect(router.push).toHaveBeenCalledWith("add-fields-cadastral")
    );
  });
});
