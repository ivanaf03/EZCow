import React from "react";

import {render} from "@testing-library/react-native";

import TabIcon from "../../../components/tabs/tab-icon";

jest.mock("@fortawesome/react-native-fontawesome", () => ({
    FontAwesomeIcon: () => null
}));

describe("TabIcon", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render correctly", () => {
        const tree = render(<TabIcon name="Test" color="c_white" icon={null} size={24} />);
        expect(tree).toMatchSnapshot();
    });

    it("should render when is focused", () => {
        const tree = render(<TabIcon name="Test" color="c_white" icon={null} size={24} focused={true} />);
        expect(tree).toMatchSnapshot();
    });
});