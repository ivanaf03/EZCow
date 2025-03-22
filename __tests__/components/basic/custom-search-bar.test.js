import React from "react";

import { render, fireEvent } from "@testing-library/react-native";

import CustomSearchBar from "../../../components/basic/custom-search-bar";

jest.mock("@fortawesome/react-native-fontawesome", () => ({
    FontAwesomeIcon: () => null
}));

describe("CustomSearchBar", () => {

    const mockOnChangeText = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render correctly", () => {
        const tree = render(
            <CustomSearchBar
                text={'test'}
                value={'test'}
                onChangeText={mockOnChangeText}
            />
        );
        expect(tree).toMatchSnapshot();
    });

    it("should call onChangeText when typing", () => {
        const tree = render(
            <CustomSearchBar
                text={'test'}
                value={'test'}
                onChangeText={mockOnChangeText}
            />
        );
        const input = tree.getByPlaceholderText("Buscar...");
        fireEvent.changeText(input, 'Test');
        expect(mockOnChangeText).toHaveBeenCalledTimes(1);
    });

});