import React from "react";

import { render } from "@testing-library/react-native";

import CustomTextDiv from "../../../components/basic/custom-text-div";

describe("CustomTextDiv", () => {
  it("renders correctly", () => {
    const tree = render(<CustomTextDiv>Test</CustomTextDiv>);
    expect(tree).toMatchSnapshot();
  });
});
