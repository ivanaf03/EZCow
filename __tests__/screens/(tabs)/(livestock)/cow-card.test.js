import React from 'react';
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import CowCard from "../../../../app/(tabs)/(livestock)/cow-card";
import { getAvailableCowNameById, setExitDateByCowId } from '../../../../app/model/cow';

jest.mock("../../../../app/model/cow", () => ({
    getAvailableCowNameById: jest.fn(() => "Vaca Test"),
    setExitDateByCowId: jest.fn(), 
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
            phase: "Ternero",
            mother_fk: "1234",
            entryDate: "2022-01-01",
        }} />);
        await waitFor (() => expect(tree).toMatchSnapshot());
    });

    it("should render correctly when mother is null", async () => {
        const tree = render(<CowCard cow={{
            id: "1",
            name: "Vaca Test",
            code: "COW001",
            gender: "Femenino",
            breed: "Holstein",
            phase: "Ternero",
            mother_fk: null,
            entryDate: "2022-01-01",
        }} />);
        await waitFor (() => expect(tree).toMatchSnapshot());
    });

    it("should delete cow card on press delete button", async () => {
        const tree = render(<CowCard cow={{
            id: "1",
            name: "Vaca Test",
            code: "COW001",
            gender: "Femenino",
            breed: "Holstein",
            phase: "Ternero",
            mother_fk: "1234",
            entryDate: "2022-01-01",
        }} />);

        await waitFor(() => expect(getAvailableCowNameById).toHaveBeenCalled());
        const deleteButton = tree.getByTestId("delete-cow-button");
        fireEvent.press(deleteButton);
        await waitFor(() => expect(setExitDateByCowId).toHaveBeenCalledWith("1"));
    });
});
