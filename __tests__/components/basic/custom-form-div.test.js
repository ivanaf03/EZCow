import React from "react";

import { render } from "@testing-library/react-native";

import CustomFormDiv from "../../../components/basic/custom-text-div";

describe("CustomFormDiv", () => {
  it("renders correctly", () => {
    const tree = render(<CustomFormDiv>Test</CustomFormDiv>);
    expect(tree).toMatchSnapshot();
  });
});