import React from 'react';

import { render, fireEvent, waitFor } from "@testing-library/react-native";

import CowCard from "../../../../app/(tabs)/(livestock)/cow-card";
import { getCowNameById } from '../../../../app/model/cow';

jest.mock("../../../../app/model/cow", () => ({
    getCowNameById: jest.fn(() => "Vaca Test"),
}));

jest.mock("@fortawesome/react-native-fontawesome", () => ({
    FontAwesomeIcon: () => null
}));

describe("CowCard", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render correctly", async () => {
        const tree = render(<CowCard cow={{
            id: "1",
            name: "Vaca Test",
            code: "COW001",
            gender: "Femenino",
            breed: "Holstein",
            mother_fk: "1234",
            entryDate: "2022-01-01T00:00:00.000Z",
        }} />);
        await waitFor(() => expect(getCowNameById).toHaveBeenCalled());
        expect(tree).toMatchSnapshot();
    });

    it("should render correctly when mother is null", async () => {
        const tree = render(<CowCard cow={{
            id: "1",
            name: "Vaca Test",
            code: "COW001",
            gender: "Femenino",
            breed: "Holstein",
            mother_fk: null,
            entryDate: "2022-01-01T00:00:00.000Z",
        }} />);
        expect(tree).toMatchSnapshot();
    });

});

