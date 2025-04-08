import React from "react";

import { render, fireEvent } from "@testing-library/react-native";

import CustomAcceptDenyModal from "../../../components/basic/custom-accept-deny-modal";

describe("CustomAcceptDenyModal", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", () => {
    const tree = render(
      <CustomAcceptDenyModal
        visible={true}
        setVisible={jest.fn()}
        title="Test"
        text="Test"
        acceptText="Test"
        denyText="Test"
        onAccept={jest.fn()}
        onDeny={jest.fn()}
      />
    );
    expect(tree).toMatchSnapshot();
  });

  it("should call onAccept when pressing accept button", () => {
    const onAccept = jest.fn();
    const tree = render(
      <CustomAcceptDenyModal
        visible={true}
        setVisible={jest.fn()}
        title="Test"
        text="Test"
        acceptText="Yes"
        denyText="No"
        onAccept={onAccept}
        onDeny={jest.fn()}
      />
    );
    fireEvent.press(tree.getByText("Yes"));
    expect(onAccept).toHaveBeenCalledTimes(1);
  });

  it("should call onDeny when pressing deny button", () => {
    const onDeny = jest.fn();
    const tree = render(
      <CustomAcceptDenyModal
        visible={true}
        setVisible={jest.fn()}
        title="Test"
        text="Test"
        acceptText="Yes"
        denyText="No"
        onAccept={jest.fn()}
        onDeny={onDeny}
      />
    );
    fireEvent.press(tree.getByText("No"));
    expect(onDeny).toHaveBeenCalledTimes(1);
  });
});