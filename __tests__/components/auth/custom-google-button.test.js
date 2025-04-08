import React from "react";

import { render, fireEvent } from "@testing-library/react-native";

import CustomGoogleButton from "../../../components/basic/custom-button";

describe("CustomGoogleButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    const tree = render(<CustomGoogleButton text="Google" onPress={() => {}} />);
    expect(tree).toMatchSnapshot();
  });

  it("should call onPress when pressed", () => {
    const onPress = jest.fn();
    const tree = render(<CustomGoogleButton text="Google" onPress={onPress} />);
    fireEvent.press(tree.getByText("Google"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
