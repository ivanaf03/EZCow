import React from "react";

import { render, waitFor, fireEvent } from "@testing-library/react-native";
import { router } from "expo-router";

import AddFields from "../../../../app/(tabs)/(maps)/add-fields";
import { getFarmUbicationByUserId } from "../../../../model/farm";
import { insertField } from "../../../../model/field";

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
  };
});

jest.mock("../../../../model/farm", () => ({
  getFarmUbicationByUserId: jest.fn(),
}));

jest.mock("../../../../model/field", () => ({
    insertField: jest.fn(),
}));

jest.mock("expo-router", () => ({
  router: {
    replace: jest.fn(),
  },
}));

jest.mock("@fortawesome/react-native-fontawesome", () => ({
  FontAwesomeIcon: () => null,
}));

describe("AddFields", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", async () => {
    getFarmUbicationByUserId.mockResolvedValue({ latitude: 0, longitude: 0 });
    const tree = render(<AddFields />);
    await waitFor(() => expect(tree).toMatchSnapshot());
  });

  it("should save correct location", async () => {
    getFarmUbicationByUserId.mockResolvedValue({ latitude: 0, longitude: 0 });
    const tree = render(<AddFields />);
    fireEvent.changeText(tree.getByPlaceholderText("Nombre"), "TestField");
    const addFieldButton = tree.getByTestId("add-field-button");
    fireEvent.press(addFieldButton);
    await(waitFor(() =>
      expect(insertField).toHaveBeenCalledWith(
        "TestField",
        0,
        0,
        "1"
      )
    ));
    expect(router.replace).toHaveBeenCalledWith("fields");
  });

  it("should navigate to fields", async () => {
    getFarmUbicationByUserId.mockResolvedValue({ latitude: 0, longitude: 0 });
    const tree = render(<AddFields />);
    const fieldsButton = tree.getByTestId("fields-button");
    fireEvent.press(fieldsButton);
    await waitFor(() => expect(router.replace).toHaveBeenCalledWith("fields"));
  });
});
