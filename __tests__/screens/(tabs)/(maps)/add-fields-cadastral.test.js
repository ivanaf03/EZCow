import React from "react";

import { render, waitFor, fireEvent } from "@testing-library/react-native";
import { router } from "expo-router";

import AddFieldsCadastral from "../../../../app/(tabs)/(maps)/add-fields-cadastral";
import { getFarmUbicationByUserId } from "../../../../model/farm";
import { insertFieldCadastral } from "../../../../model/field";

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

jest.mock("react-native-maps", () => {
  const React = require("react");
  const { View } = require("react-native");

  return {
    __esModule: true,
    default: (props) => React.createElement(View, props, props.children),
    Marker: (props) => React.createElement(View, props, props.children),
  };
});

jest.mock("../../../../model/farm", () => ({
  getFarmUbicationByUserId: jest.fn(),
}));

jest.mock("../../../../model/field", () => ({
    insertFieldCadastral: jest.fn(),
}));

jest.mock("@fortawesome/react-native-fontawesome", () => ({
  FontAwesomeIcon: () => null,
}));

describe("AddFieldsCadastral", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", async () => {
    getFarmUbicationByUserId.mockResolvedValue({ latitude: 0, longitude: 0 });
    const tree = render(<AddFieldsCadastral />);
    await waitFor(() => expect(tree).toMatchSnapshot());
  });

  it("should save correct location", async () => {
    getFarmUbicationByUserId.mockResolvedValue({ latitude: 0, longitude: 0 });
    const tree = render(<AddFieldsCadastral />);
    fireEvent.changeText(tree.getByPlaceholderText("Nombre"), "TestField");
    fireEvent.changeText(tree.getByPlaceholderText("Referencia"), "12345678");
    const addFieldButton = tree.getByTestId("add-field-button");
    fireEvent.press(addFieldButton);
        await waitFor(() => {
          expect(insertFieldCadastral).toHaveBeenCalledWith(
            "TestField",
            "12345678",
            "1"
          );
          expect(router.replace).toHaveBeenCalledWith("cadastral-fields");
        });
  });

  it("should navigate to cadastral-fields", async () => {
    getFarmUbicationByUserId.mockResolvedValue({ latitude: 0, longitude: 0 });
    const tree = render(<AddFieldsCadastral />);
    const fieldsButton = tree.getByTestId("fields-button");
    fireEvent.press(fieldsButton);
    await waitFor(() => expect(router.replace).toHaveBeenCalledWith("cadastral-fields"));
  });
});