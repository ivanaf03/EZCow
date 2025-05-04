import React from "react";

import { render, waitFor, fireEvent } from "@testing-library/react-native";
import { router } from "expo-router";

import Maps from "../../../../app/(tabs)/(maps)/maps";
import { getFarmUbicationByUserId, insertFarmUbication } from "../../../../model/farm";

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

jest.mock("../../../../model/farm", () => ({
    getFarmUbicationByUserId: jest.fn(), 
    insertFarmUbication: jest.fn(),
}));

jest.mock("expo-router", () => ({
    router: {
        replace: jest.fn(),
    },
}));

describe("Maps", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render correctly", async () => {
        getFarmUbicationByUserId.mockResolvedValue({latitude: 0, longitude: 0});
        const tree = render(<Maps />);
        await waitFor(() => expect(tree).toMatchSnapshot());
    });

    it("should save correct location", async () => {
        getFarmUbicationByUserId.mockResolvedValue({latitude: 0, longitude: 0});
        const tree = render(<Maps />);
        await waitFor(() => expect(tree).toMatchSnapshot());
        const saveLocationButton = tree.getByText("Guardar ubicación");
        fireEvent.press(saveLocationButton);
        await waitFor(() => expect(insertFarmUbication).toHaveBeenCalledWith("1", 0, 0));
    });

    it("should navigate to fields", async () => {
        getFarmUbicationByUserId.mockResolvedValue({latitude: 0, longitude: 0});
        const tree = render(<Maps />);
        await waitFor(() => expect(tree).toMatchSnapshot());
        const fieldsButton = tree.getByTestId("fields-button");
        fireEvent.press(fieldsButton);
        await waitFor(() => expect(router.replace).toHaveBeenCalledWith("fields"));
    });
});