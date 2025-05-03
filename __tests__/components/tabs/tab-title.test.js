import React from "react";

import { render } from "@testing-library/react-native";

import TabTitle from "../../../components/tabs/tab-title";

describe("TabTitle", () => {
  it("renders correctly", () => {
    const tree = render(<TabTitle text="Test" />);
    expect(tree).toMatchSnapshot();
  });
});