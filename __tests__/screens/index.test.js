import React from "react";

import {waitFor, render, fireEvent} from "@testing-library/react-native";
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

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render the correct text", () => {
        const {getByText} = render(<App />);
        waitFor (() => expect(getByText("Tu aplicación de gestión de ganado")).toBeTruthy());
        waitFor (() => expect(getByText("Iniciar sesión")).toBeTruthy());
    });

    test("should render the correct image", () => {
        const { getByTestId } = render(<App />);
        waitFor (() => expect(getByTestId("app-logo")).toBeTruthy());
    });

    it("should render the correct buttons", () => {
        const {getByText} = render(<App />);
        waitFor (() => expect(getByText("Iniciar sesión")).toBeTruthy());
        waitFor (() => expect(getByText("Registrarse")).toBeTruthy());
    });

    it("should render the correct waves", () => {
        const { getByTestId } = render(<App />);
        waitFor (() => expect(getByTestId("waves")).toBeTruthy());
    });

    it("register button should navigate to register screen", () => {
        const {getByText} = render(<App />);
        const registerButton = getByText("Registrarse");
        fireEvent.press(registerButton);
        waitFor (() => expect(router.push).toHaveBeenCalledWith("register"));
    });

    it("login button should navigate to login screen", () => {
        const {getByText} = render(<App />);
        const loginButton = getByText("Iniciar sesión");
        fireEvent.press(loginButton);
        waitFor (() => expect(router.push).toHaveBeenCalledWith("login"));
    });

});
