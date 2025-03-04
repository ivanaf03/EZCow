import React from "react";

import {waitFor, render, fireEvent} from "@testing-library/react-native";
import { router } from 'expo-router';

import App from "../../app/index";

jest.mock('expo-font', () => ({
    loadAsync: jest.fn(() => Promise.resolve()), 
}));

jest.mock("expo-router", () => ({
    router: {
        replace: jest.fn(),
    },
}));

describe("App", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render correctly",  async () => {    
        const tree = render(<App />);
        await waitFor(() => expect(tree).toMatchSnapshot());
    });

    it("register button should navigate to register screen", () => {
        const {getByText} = render(<App />);
        const registerButton = getByText("Registrarse");
        fireEvent.press(registerButton);
        waitFor (() => expect(router.replace).toHaveBeenCalledWith("register"));
    });

    it("login button should navigate to login screen", () => {
        const {getByText} = render(<App />);
        const loginButton = getByText("Iniciar sesión");
        fireEvent.press(loginButton);
        waitFor (() => expect(router.replace).toHaveBeenCalledWith("login"));
    });

});
