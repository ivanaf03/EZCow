import React from "react";

import { render, fireEvent, waitFor } from "@testing-library/react-native";
import CowCard from "../../../../app/(tabs)/(livestock)/cow-card";

jest.mock("../../../../app/model/cow", () => ({
  getAvailableCowNameById: jest.fn(() => "Vaca Test"),
  setExitDateByCowId: jest.fn(),
}));

jest.mock("@fortawesome/react-native-fontawesome", () => ({
  FontAwesomeIcon: () => null,
}));

describe("CowCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", async () => {
    const tree = render(
      <CowCard
        cow={{
          id: "1",
          name: "Vaca Test",
          code: "COW001",
          gender: "Femenino",
          breed: "Holstein",
          phase: "Ternero",
          mother_fk: "1234",
          entryDate: "2022-01-01",
        }}
      />
    );
    await waitFor(() => expect(tree).toMatchSnapshot());
  });

  it("should render correctly when mother is null", async () => {
    const tree = render(
      <CowCard
        cow={{
          id: "1",
          name: "Vaca Test",
          code: "COW001",
          gender: "Femenino",
          breed: "Holstein",
          phase: "Ternero",
          mother_fk: null,
          entryDate: "2022-01-01",
        }}
      />
    );
    await waitFor(() => expect(tree).toMatchSnapshot());
  });

  it("should call onDelete with cow data when pressing delete", async () => {
    const onDeleteMock = jest.fn();
    const tree = render(
      <CowCard
        cow={{
          id: "1",
          name: "Vaca Test",
          code: "COW001",
          gender: "Femenino",
          breed: "Holstein",
          phase: "Ternero",
          mother_fk: null,
          entryDate: "2022-01-01",
        }}
        onDelete={onDeleteMock}
      />
    );
    const deleteButton = tree.getByTestId("delete-cow-button");
    fireEvent.press(deleteButton);
    expect(onDeleteMock).toHaveBeenCalledTimes(1);
  });
});
