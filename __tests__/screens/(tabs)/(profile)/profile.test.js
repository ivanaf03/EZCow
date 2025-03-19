import React from "react";

import { render, waitFor } from "@testing-library/react-native";

import Profile from "../../../../app/(tabs)/(profile)/profile";

jest.mock("../../../../hooks/providers/user-provider", () => ({
    useUser: jest.fn(() => ({
        user: {id: "1", name: "TestUser", email: "test@test.com"},
    })),
}));

describe("Profile", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render correctly", async () => {
        const tree = render(<Profile />);
        expect(tree).toMatchSnapshot();
    });

});