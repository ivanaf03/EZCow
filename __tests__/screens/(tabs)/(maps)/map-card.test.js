import React from 'react';

import { render, waitFor, fireEvent } from "@testing-library/react-native";
import MapCard from "../../../../app/(tabs)/(maps)/map-card";

jest.mock("@fortawesome/react-native-fontawesome", () => ({
    FontAwesomeIcon: () => null,
}));

describe("MapCard", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render correctly", async () => {
        const tree = render(<MapCard map={{
            name: "Mapa Test",
            latitude: 10,
            longitude: 10,
        }} />);
        await waitFor (() => expect(tree).toMatchSnapshot());
    });

    it("should call onDelete with map data when pressing delete", async () => {
        const onDeleteMock = jest.fn();
        const tree = render(<MapCard map={{
            name: "Mapa Test",
            latitude: 10,
            longitude: 10,
        }} onDelete={onDeleteMock} />);
        const deleteButton = tree.getByTestId("delete-map-button");
        fireEvent.press(deleteButton);
        expect(onDeleteMock).toHaveBeenCalledTimes(1);
    });
});