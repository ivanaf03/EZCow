import React from "react";

import { render, waitFor, fireEvent } from "@testing-library/react-native";
import { router } from "expo-router";

import Fields from "../../../../app/(tabs)/(maps)/fields";
import { getAllFieldsByUserId } from "../../../../model/field";

jest.mock("../../../../store/user-provider", () => ({
    useUser: jest.fn(() => ({
        user: {id: "1", name: "TestUser", email: "test@test.com"},
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

jest.mock("../../../../model/field", () => ({
    getAllFieldsByUserId: jest.fn(), 
    deleteFieldById: jest.fn(),
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

describe("Fields", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render correctly", async () => {
        getAllFieldsByUserId.mockResolvedValue([{id: 1, name: "TestField", cadastralReference: "12345678", latitude: 0, longitude: 0}]);
        const tree = render(<Fields />);
        await waitFor(() => expect(tree).toMatchSnapshot());
    });

    it("should navigate to cadastral-fields", async () => {
        getAllFieldsByUserId.mockResolvedValue([{id: 1, name: "TestField", cadastralReference: "12345678", latitude: 0, longitude: 0}]);
        const tree = render(<Fields />);
        await waitFor(() => expect(tree).toMatchSnapshot());
        const cadastralFieldsButton = tree.getByTestId("cadastral-fields-button");
        fireEvent.press(cadastralFieldsButton);
        await waitFor(() => expect(router.replace).toHaveBeenCalledWith("cadastral-fields"));
    });

    it("should navigate to add-fields", async () => {
        getAllFieldsByUserId.mockResolvedValue([{id: 1, name: "TestField", cadastralReference: "12345678", latitude: 0, longitude: 0}]);
        const tree = render(<Fields />);
        await waitFor(() => expect(tree).toMatchSnapshot());
        const addFieldsButton = tree.getByText("Añadir con ubicación");
        fireEvent.press(addFieldsButton);
        await waitFor(() => expect(router.push).toHaveBeenCalledWith("add-fields"));
    });
});