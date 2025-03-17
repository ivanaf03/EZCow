import React from "react";

import {render, fireEvent} from "@testing-library/react-native";
import { router } from 'expo-router';

import CustomLink from "../../../components/basic/custom-link";

jest.mock("expo-router", () => ({
    router: {
        push: jest.fn(),
    },
}));

describe("CustomLink", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render correctly", () => {
        const tree = render(<CustomLink text="Test" to="Test"/>);
        expect(tree).toMatchSnapshot();
    });

    it("should navigate to the correct screen", () => {
        const tree = render(<CustomLink text="Test" to="Test"/>);
        fireEvent.press(tree.getByText("Test"));
        expect(router.push).toHaveBeenCalledWith("Test");
    });

});