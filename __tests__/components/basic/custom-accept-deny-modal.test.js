import React from "react";

import { render, fireEvent } from "@testing-library/react-native";

import CustomAcceptDenyModal from "../../../components/basic/custom-accept-deny-modal";

describe("CustomAcceptDenyModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const baseProps = {
    visible: true,
    setVisible: jest.fn(),
    title: "Test Title",
    text: "Test Text",
    acceptText: "Accept",
    denyText: "Deny",
    onAccept: jest.fn(),
    onDeny: jest.fn(),
  };

  it("should render correctly", () => {
    const tree = render(<CustomAcceptDenyModal {...baseProps} />);
    expect(tree).toMatchSnapshot();
  });

  it("should call onAccept when pressing accept button", () => {
    const onAccept = jest.fn();
    const tree = render(
      <CustomAcceptDenyModal {...baseProps} onAccept={onAccept} />
    );
    fireEvent.press(tree.getByText("Accept"));
    expect(onAccept).toHaveBeenCalledTimes(1);
  });

  it("should call onDeny when pressing deny button", () => {
    const onDeny = jest.fn();
    const tree = render(
      <CustomAcceptDenyModal {...baseProps} onDeny={onDeny} />
    );
    fireEvent.press(tree.getByText("Deny"));
    expect(onDeny).toHaveBeenCalledTimes(1);
  });

  it("should call setVisible(false) when pressing the outer background", () => {
    const setVisible = jest.fn();
    const tree = render(
      <CustomAcceptDenyModal {...baseProps} setVisible={setVisible} />
    );

    const pressables = tree.UNSAFE_getAllByType(require("react-native").Pressable);
    fireEvent.press(pressables[0]); 
    expect(setVisible).toHaveBeenCalledWith(false);
  });

});
