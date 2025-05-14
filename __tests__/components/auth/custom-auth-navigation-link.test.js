import React from "react";

import { render } from "@testing-library/react-native";

import CustomAuthNavigationLink from "../../../components/auth/custom-auth-navigation-link";

describe("CustomAuthNavigationLink", () => {
  it("renders correctly", () => {
    const { getByTestId } = render(
      <CustomAuthNavigationLink
        text="text"
        linkText="linkText"
        to="to"
        testID="testID"
      />
    );

    expect(getByTestId("testID")).toBeTruthy();
  });
});