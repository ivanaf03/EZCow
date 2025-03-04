import React from "react";

import { render } from "@testing-library/react-native";

import CustomPicker from "../../../components/basic/custom-picker";

describe("CustomPicker", () => {

    const mockOnValueChange = jest.fn();
    const mockOptions = [
        { label: 'Option 1', value: 'option1' },
        { label: 'Option 2', value: 'option2' },
        { label: 'Option 3', value: 'option3' },
        { label: 'Option 4', value: 'option4' },
        { label: 'Option 5', value: 'option5' },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render correctly", () => {
        const tree = render(
            <CustomPicker
                text={'test'}
                value={'test'}
                onValueChange={mockOnValueChange}
                options={mockOptions}
            />
        );
        expect(tree).toMatchSnapshot();
    });

});