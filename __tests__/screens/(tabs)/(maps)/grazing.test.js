import React from "react";

import { render, waitFor, fireEvent } from "@testing-library/react-native";
import { router } from "expo-router";

import Grazing from "../../../../app/(tabs)/(maps)/grazing";
import {
  getExitedGrazingByuserId,
  getGrazingByuserId,
  expireGrazing,
} from "../../../../model/grazing";

jest.mock("../../../../store/user-provider", () => ({
  useUser: jest.fn(() => ({
    user: { id: "1", name: "TestUser", email: "test@test.com" },
  })),
}));

jest.mock("../../../../model/grazing", () => ({
  getGrazingByuserId: jest.fn(),
  getExitedGrazingByuserId: jest.fn(),
  expireGrazing: jest.fn(),
}));

jest.mock("expo-router", () => ({
  router: {
    replace: jest.fn(),
  },
}));

jest.mock("@fortawesome/react-native-fontawesome", () => ({
  FontAwesomeIcon: () => null,
}));

describe("Grazing", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", async () => {
    getGrazingByuserId.mockResolvedValue([
      {
        grazingId: 1,
        initialDate: "2022-01-01",
        endDate: "2022-01-02",
        fieldName: "TestField",
        groupName: "TestGroup",
      },
    ]);
    getExitedGrazingByuserId.mockResolvedValue([
      {
        grazingId: 1,
        initialDate: "2022-01-01",
        endDate: "2022-01-02",
        fieldName: "TestField",
        groupName: "TestGroup",
      },
    ]);
    const tree = render(<Grazing />);
    await waitFor(() => expect(tree).toMatchSnapshot());
  });

  it("should navigate to grazing-form", async () => {
    getGrazingByuserId.mockResolvedValue([
      {
        grazingId: 1,
        initialDate: "2022-01-01",
        endDate: "2022-01-02",
        fieldName: "TestField",
        groupName: "TestGroup",
      },
    ]);
    getExitedGrazingByuserId.mockResolvedValue([
      {
        grazingId: 1,
        initialDate: "2022-01-01",
        endDate: "2022-01-02",
        fieldName: "TestField",
        groupName: "TestGroup",
      },
    ]);
    const tree = render(<Grazing />);
    await waitFor(() => expect(tree).toMatchSnapshot());
    const grazingFormButton = tree.getByTestId("grazing-form-button");
    fireEvent.press(grazingFormButton);
    await waitFor(() =>
      expect(router.replace).toHaveBeenCalledWith("grazing-form")
    );
  });

  it("should navigate to fields", async () => {
    getGrazingByuserId.mockResolvedValue([
      {
        grazingId: 1,
        initialDate: "2022-01-01",
        endDate: "2022-01-02",
        fieldName: "TestField",
        groupName: "TestGroup",
      },
    ]);
    getExitedGrazingByuserId.mockResolvedValue([
      {
        grazingId: 1,
        initialDate: "2022-01-01",
        endDate: "2022-01-02",
        fieldName: "TestField",
        groupName: "TestGroup",
      },
    ]);
    const tree = render(<Grazing />);
    await waitFor(() => expect(tree).toMatchSnapshot());
    const fieldsButton = tree.getByTestId("fields-button");
    fireEvent.press(fieldsButton);
    await waitFor(() => expect(router.replace).toHaveBeenCalledWith("fields"));
  });

  it("should navigate to cadastral-fields", async () => {
    getGrazingByuserId.mockResolvedValue([
      {
        grazingId: 1,
        initialDate: "2022-01-01",
        endDate: "2022-01-02",
        fieldName: "TestField",
        groupName: "TestGroup",
      },
    ]);
    getExitedGrazingByuserId.mockResolvedValue([
      {
        grazingId: 1,
        initialDate: "2022-01-01",
        endDate: "2022-01-02",
        fieldName: "TestField",
        groupName: "TestGroup",
      },
    ]);
    const tree = render(<Grazing />);
    await waitFor(() => expect(tree).toMatchSnapshot());
    const cadastralFieldsButton = tree.getByTestId("cadastral-fields-button");
    fireEvent.press(cadastralFieldsButton);
    await waitFor(() =>
      expect(router.replace).toHaveBeenCalledWith("cadastral-fields")
    );
  });
});
