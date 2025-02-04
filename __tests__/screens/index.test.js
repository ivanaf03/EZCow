import React from "react";

import {render, fireEvent} from "@testing-library/react-native";
import { router } from 'expo-router';

import App from "../../app/index";

jest.mock('expo-font', () => ({
    loadAsync: jest.fn(() => Promise.resolve()), 
  }));

  jest.mock("expo-router", () => ({
    router: {
      push: jest.fn(),
    },
  }));

describe("App", () => {

    it("should render the correct text", () => {
        const {getByText} = render(<App />);
        expect(getByText("EZCow")).toBeTruthy();
        expect(getByText("Tu aplicación de gestión de ganado")).toBeTruthy();
    });

    test("should render the correct image", () => {
        const { getByTestId } = render(<App />);
        expect(getByTestId("app-logo")).toBeTruthy();
    });

    it("should render the correct buttons", () => {
        const {getByText} = render(<App />);
        expect(getByText("Iniciar sesión")).toBeTruthy();
        expect(getByText("Registrarse")).toBeTruthy();
    });

    it("should render the correct waves", () => {
        const { getByTestId } = render(<App />);
        expect(getByTestId("waves")).toBeTruthy();
    });

    it("register button should navigate to register screen", () => {
        const {getByText} = render(<App />);
        const registerButton = getByText("Registrarse");
        fireEvent.press(registerButton);
        expect(router.push).toHaveBeenCalledWith("register");
    });

    it("login button should navigate to login screen", () => {
        const {getByText} = render(<App />);
        const loginButton = getByText("Iniciar sesión");
        fireEvent.press(loginButton);
        expect(router.push).toHaveBeenCalledWith("login");
    });

});
