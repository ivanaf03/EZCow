import React from "react";

import {render, fireEvent} from "@testing-library/react-native";

import CustomInput from "../../../components/basic/custom-input";

describe("CustomInput", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render correctly", () => {
        const tree = render(<CustomInput text="Test" placeholder="Test" value="Test" />);
        expect(tree).toMatchSnapshot();
    });

    it("should change value when typing", () => {
        const onChangeText = jest.fn();
        const tree = render(<CustomInput text="Test" placeholder="Test" value="Test" onChangeText={onChangeText} />);
        fireEvent.changeText(tree.getByPlaceholderText("Test"), 'Test2');
        expect(onChangeText).toHaveBeenCalledTimes(1);
    });

});