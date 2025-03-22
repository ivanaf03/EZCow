import React from "react";

import { render, fireEvent } from "@testing-library/react-native";

import CustomPasswordView from "../../../components/basic/custom-password-view";

jest.mock("@fortawesome/react-native-fontawesome", () => ({
    FontAwesomeIcon: () => null
}));

describe("CustomPasswordView", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render correctly", () => {
        const tree = render(
            <CustomPasswordView
                text={'test'}
                value={'test'}
            />
        );
        expect(tree).toMatchSnapshot();
    });

    it("should show password when clicking on eye icon", () => {
        const onChangeText = jest.fn();
        const tree = render(
            <CustomPasswordView
                text={'test'}
                value={'test'}
                onChangeText={onChangeText}
            />
        );
        const eyeIcon = tree.getByTestId("eye-icon");
        expect(tree.getByTestId("password-text").props.children).toBe("*".repeat(4));        
        fireEvent.press(eyeIcon);
        expect(tree.getByTestId("password-text").props.children).toBe("test");
    });

    it("should hide password when clicking on eye icon", () => {
        const onChangeText = jest.fn();
        const tree = render(
            <CustomPasswordView
                text={'test'}
                value={'test'}
                onChangeText={onChangeText}
            />
        );
        const eyeIcon = tree.getByTestId("eye-icon");
        expect(tree.getByTestId("password-text").props.children).toBe("*".repeat(4));
        fireEvent.press(eyeIcon);
        expect(tree.getByTestId("password-text").props.children).toBe("test");
        fireEvent.press(eyeIcon);
        expect(tree.getByTestId("password-text").props.children).toBe("*".repeat(4));
    });

});