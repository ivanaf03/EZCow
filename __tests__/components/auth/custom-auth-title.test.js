import React from "react";

import { render } from "@testing-library/react-native";

import CustomAuthTitle from "../../../components/auth/custom-auth-title";

describe("CustomAuthTitle", () => {
  it("renders correctly", () => {
    const tree = render(<CustomAuthTitle text="Test" />);
    expect(tree).toMatchSnapshot();
  });
});