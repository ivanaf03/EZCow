import React from "react";

import { render, waitFor } from "@testing-library/react-native";

import HealthDay from "../../../../app/(tabs)/(health)/health-day";

describe("HealthDay", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", async () => {
    const tree = render(
      <HealthDay
        date="2022-01-01"
        events={[
          {
            id: "1",
            cowName: "Vaca Test",
            name: "Prueba",
            description: "Esto es una prueba",
          },
        ]}
      />
    );
    await waitFor(() => expect(tree).toMatchSnapshot());
  });

  it("should render correctly with no events", async () => {
    const tree = render(
      <HealthDay
        date="2022-01-01"
        events={[
        ]}
      />
    );
    await waitFor(() => expect(tree).toMatchSnapshot());
  });
});