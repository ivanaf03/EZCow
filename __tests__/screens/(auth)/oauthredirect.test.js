import React from "react";

import {render} from "@testing-library/react-native";

import OauthRedirect from "../../../app/(auth)/oauthredirect";

describe("OauthRedirect", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render correctly", () => {
        const tree = render(<OauthRedirect />);
        expect(tree).toMatchSnapshot();
    });

});