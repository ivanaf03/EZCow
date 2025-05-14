import React from "react";

import { render, fireEvent } from "@testing-library/react-native";

import CustomPressable from "../../../components/basic/custom-pressable";

jest.mock("@fortawesome/react-native-fontawesome", () => ({
  FontAwesomeIcon: () => null,
}));

describe("CustomPressable", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    const tree = render(
      <CustomPressable text="Test" onPress={() => {}} />
    );
    expect(tree).toMatchSnapshot();
  });

  it("should call onPress when pressed", () => {
    const onPress = jest.fn();
    const tree = render(
      <CustomPressable text="Test" onPress={onPress} />
    );
    fireEvent.press(tree.getByText("Test"));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});