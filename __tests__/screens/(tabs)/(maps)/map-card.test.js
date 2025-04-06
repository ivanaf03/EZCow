import React from 'react';

import { render, waitFor } from "@testing-library/react-native";
import MapCard from "../../../../app/(tabs)/(maps)/map-card";

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
});