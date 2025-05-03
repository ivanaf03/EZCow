import React from "react";

import { render, fireEvent } from "@testing-library/react-native";

import CustomButton from "../../../components/basic/custom-button";

describe("CustomButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    const tree = render(<CustomButton text="Test" onPress={() => {}} />);
    expect(tree).toMatchSnapshot();
  });

  it("should call onPress when pressed", () => {
    const onPress = jest.fn();
    const tree = render(<CustomButton text="Test" onPress={onPress} />);
    fireEvent.press(tree.getByText("Test"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
