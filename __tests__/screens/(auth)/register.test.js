import React from "react";

import {render, fireEvent, waitFor} from "@testing-library/react-native";
import { router } from 'expo-router';
import { Alert } from "react-native";

import Register from "../../../app/(auth)/register";

jest.mock("expo-router", () => ({
    router: {
        push: jest.fn(),
    },
}));

jest.mock("../../../app/model/users", () => ({
    insertUser: jest.fn(),
}));

jest.spyOn(Alert, "alert");

jest.mock("@fortawesome/react-native-fontawesome", () => ({
    FontAwesomeIcon: () => null
}));

describe("Register", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render correctly", () => {
        const tree = render(<Register />);
        expect(tree).toMatchSnapshot();
    });

    it("sign up link should navigate to login screen", () => {
        const {getByTestId} = render(<Register />);
        const signInLink = getByTestId("sign-in-link");
        fireEvent.press(signInLink);
        expect(router.push).toHaveBeenCalledWith("login");
    });

    it("shows an alert when email is not valid", () => {
        const {getByPlaceholderText, getAllByPlaceholderText, getByTestId} = render(<Register />);
        const nameInput = getByPlaceholderText("Nombre");
        fireEvent.changeText(nameInput, "A");
        const emailInput = getByPlaceholderText("Email");
        fireEvent.changeText(emailInput, "A");
        const passwordInput = getAllByPlaceholderText("Contraseña")[0];
        fireEvent.changeText(passwordInput, "12345678");
        const confirmPasswordInput = getAllByPlaceholderText("Contraseña")[1];
        fireEvent.changeText(confirmPasswordInput, "12345678");
        const signUpButton = getByTestId("sign-up-button");
        fireEvent.press(signUpButton);
        expect(Alert.alert).toHaveBeenCalledWith('Error', 'El email no es válido.');
    });

    it("shows an alert when password is too short", () => {
        const {getByPlaceholderText, getAllByPlaceholderText, getByTestId} = render(<Register />);
        const nameInput = getByPlaceholderText("Nombre");
        fireEvent.changeText(nameInput, "A");
        const emailInput = getByPlaceholderText("Email");
        fireEvent.changeText(emailInput, "test@example.com");
        const passwordInput = getAllByPlaceholderText("Contraseña")[0];
        fireEvent.changeText(passwordInput, "123456");
        const confirmPasswordInput = getAllByPlaceholderText("Contraseña")[1];
        fireEvent.changeText(confirmPasswordInput, "123456");
        const signUpButton = getByTestId("sign-up-button");
        fireEvent.press(signUpButton);
        expect(Alert.alert).toHaveBeenCalledWith('Error', 'La contraseña debe tener al menos 8 caracteres.');
    });

    it("shows an alert when passwords are not the same", () => {
        const {getByPlaceholderText, getAllByPlaceholderText, getByTestId} = render(<Register />);
        const nameInput = getByPlaceholderText("Nombre");
        fireEvent.changeText(nameInput, "A");
        const emailInput = getByPlaceholderText("Email");
        fireEvent.changeText(emailInput, "test@example.com");
        const passwordInput = getAllByPlaceholderText("Contraseña")[0];
        fireEvent.changeText(passwordInput, "12345678");
        const confirmPasswordInput = getAllByPlaceholderText("Contraseña")[1];
        fireEvent.changeText(confirmPasswordInput, "123456789");
        const signUpButton = getByTestId("sign-up-button");
        fireEvent.press(signUpButton);
        expect(Alert.alert).toHaveBeenCalledWith('Error', 'Las contraseñas no coinciden.');
    });

    it("shows an alert when email is already registered", () => {    
        const {getByPlaceholderText, getAllByPlaceholderText, getByTestId} = render(<Register />);
        const nameInput = getByPlaceholderText("Nombre");
        fireEvent.changeText(nameInput, "A");
        const emailInput = getByPlaceholderText("Email");
        fireEvent.changeText(emailInput, "test@example.com");
        const passwordInput = getAllByPlaceholderText("Contraseña")[0];
        fireEvent.changeText(passwordInput, "12345678");
        const confirmPasswordInput = getAllByPlaceholderText("Contraseña")[1];
        fireEvent.changeText(confirmPasswordInput, "12345678");
        const signUpButton = getByTestId("sign-up-button");
        fireEvent.press(signUpButton);
        waitFor(() => expect(Alert.alert).toHaveBeenCalledWith('Error', 'Error al registrar. Inténtalo de nuevo. Asegúrate de que no tengas ya una cuenta.'));
    });

    it("works when email, password and confirm password are correct", async() => {
        const {getByPlaceholderText, getAllByPlaceholderText, getByTestId} = render(<Register />);
        const nameInput = getByPlaceholderText("Nombre");
        fireEvent.changeText(nameInput, "A");
        const emailInput = getByPlaceholderText("Email");
        fireEvent.changeText(emailInput, "test@example.com");
        const passwordInput = getAllByPlaceholderText("Contraseña")[0];
        fireEvent.changeText(passwordInput, "12345678");
        const confirmPasswordInput = getAllByPlaceholderText("Contraseña")[1];
        fireEvent.changeText(confirmPasswordInput, "12345678");
        const signUpButton = getByTestId("sign-up-button");
        fireEvent.press(signUpButton);
        await waitFor(() => expect(router.push).toHaveBeenCalledWith('home'));
    });
});