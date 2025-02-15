import React from "react";

import {render, fireEvent} from "@testing-library/react-native";

import CustomPasswordInput from "../../../components/basic/custom-password-input";

jest.mock("@fortawesome/react-native-fontawesome", () => ({
    FontAwesomeIcon: () => null
}));

describe("CustomPasswordInput", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render correctly", () => {
        const tree = render(<CustomPasswordInput text="Test" placeholder="Test" value="Test" />);
        expect(tree).toMatchSnapshot();
    });

    it("should change value when typing", () => {
        const onChangeText = jest.fn();
        const tree = render(<CustomPasswordInput text="Test" placeholder="Test" value="Test" onChangeText={onChangeText} />);
        fireEvent.changeText(tree.getByPlaceholderText("Test"), 'Test2');
        expect(onChangeText).toHaveBeenCalledTimes(1);
    });

    it("should show password when clicking on eye icon", () => {
        const onChangeText = jest.fn();
        const tree = render(<CustomPasswordInput text="Test" placeholder="Test" value="Test" onChangeText={onChangeText} />);
        const eyeIcon = tree.getByTestId("eye-icon");
        expect(tree.getByPlaceholderText("Test").props.secureTextEntry).toBe(true);
        fireEvent.press(eyeIcon);
        expect(tree.getByPlaceholderText("Test").props.secureTextEntry).toBe(false);
    });

    it("should hide password when clicking on eye icon", () => {
        const onChangeText = jest.fn();
        const tree = render(<CustomPasswordInput text="Test" placeholder="Test" value="Test" onChangeText={onChangeText} />);
        const eyeIcon = tree.getByTestId("eye-icon");
        expect(tree.getByPlaceholderText("Test").props.secureTextEntry).toBe(true);
        fireEvent.press(eyeIcon);
        expect(tree.getByPlaceholderText("Test").props.secureTextEntry).toBe(false);
        fireEvent.press(eyeIcon);
        expect(tree.getByPlaceholderText("Test").props.secureTextEntry).toBe(true);
    });

});