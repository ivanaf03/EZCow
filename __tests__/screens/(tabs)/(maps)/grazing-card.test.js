import React from "react";

import { render, fireEvent, waitFor } from "@testing-library/react-native";

import GrazingCard from "../../../../app/(tabs)/(maps)/grazing-card";

jest.mock("@fortawesome/react-native-fontawesome", () => ({
  FontAwesomeIcon: () => null,
}));

describe("GrazingCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", async () => {
    const tree = render(
      <GrazingCard
        grazing={{ initialDate: "2022-01-01", endDate: "2022-01-02" }}
        onDelete={jest.fn()}
        isExited={false}
      />
    );
    await waitFor(() => expect(tree).toMatchSnapshot());
  });

  it("should render correctly expired", async () => {
    const tree = render(
      <GrazingCard
        grazing={{ initialDate: "2022-01-01", endDate: "2022-01-02" }}
        onDelete={jest.fn()}
        isExited={true}
      />
    );
    await waitFor(() => expect(tree).toMatchSnapshot());
  });

  it("should call onDelete when pressing delete button", async () => {
    const onDelete = jest.fn();
    const { getByTestId } = render(
      <GrazingCard
        grazing={{ initialDate: "2022-01-01", endDate: "2022-01-02" }}
        onDelete={onDelete}
        isExited={false}
      />
    );

    const handleDeleteGrazingButton = getByTestId("delete-grazing-button");
    fireEvent.press(handleDeleteGrazingButton);
    expect(onDelete).toHaveBeenCalledWith({
      initialDate: "2022-01-01",
      endDate: "2022-01-02",
    });
  });
});