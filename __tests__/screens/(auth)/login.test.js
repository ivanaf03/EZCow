import React from "react";

import {render, fireEvent, waitFor} from "@testing-library/react-native";
import { router } from 'expo-router';
import { Alert } from "react-native";
import * as Google from 'expo-auth-session/providers/google';

import Login from "../../../app/(auth)/login";
import { getUserByEmail, insertUserGoogle } from "../../../app/model/users";

jest.mock("expo-router", () => ({
    router: {
        replace: jest.fn(),
        push: jest.fn(),
    },
}));

jest.mock("../../../app/model/users", () => ({
    getUserByEmail: jest.fn(),
    insertUserGoogle: jest.fn(),
}));

jest.mock("crypto-js", () => ({
    SHA256: jest.fn(data => data),
}));

jest.mock('jwt-decode', () => ({
    jwtDecode: jest.fn().mockReturnValue({
      name: 'Test User',
      email: 'test@example.com',
      sub: 'googleId123',
    }),
  }));

jest.mock("../../../store/user-provider", () => ({
    useUser: jest.fn(() => ({
        login: jest.fn(),
    })),
}));

jest.spyOn(Alert, "alert");

jest.mock("@fortawesome/react-native-fontawesome", () => ({
    FontAwesomeIcon: () => null
}));

jest.mock("expo-auth-session/providers/google", () => ({
    useAuthRequest: jest.fn(() => [
        {},
        {}, 
        jest.fn(),
    ]),
}));

describe("Login", () => {

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should render correctly", () => {
        const tree = render(<Login />);
        expect(tree).toMatchSnapshot();
    });

    it("sign in link should navigate to register screen", () => {
        const {getByTestId} = render(<Login />);
        const signInLink = getByTestId("sign-up-link");
        fireEvent.press(signInLink);
        expect(router.push).toHaveBeenCalledWith("register");
    });

    it("shows an alert when email or password is empty", () => {
        const {getByTestId} = render(<Login />);
        const signInButton = getByTestId("sign-in-button");
        fireEvent.press(signInButton);
        expect(Alert.alert).toHaveBeenCalledWith('Error', 'Por favor, rellena todos los campos.');
    });

    it("shows an alert when email is not valid", () => {
        const {getByPlaceholderText, getByTestId} = render(<Login />);
        const nameInput = getByPlaceholderText("Email");
        fireEvent.changeText(nameInput, "A");
        const passwordInput = getByPlaceholderText("Contraseña");
        fireEvent.changeText(passwordInput, "123456");
        const signInButton = getByTestId("sign-in-button");
        fireEvent.press(signInButton);
        expect(Alert.alert).toHaveBeenCalledWith('Error', 'El email no es válido.');
    });

    it("shows an alert when password is too short", () => {
        const {getByPlaceholderText, getByTestId} = render(<Login />);
        const nameInput = getByPlaceholderText("Email");
        fireEvent.changeText(nameInput, "test@example.com");
        const passwordInput = getByPlaceholderText("Contraseña");
        fireEvent.changeText(passwordInput, "123456");
        const signInButton = getByTestId("sign-in-button");
        fireEvent.press(signInButton);
        expect(Alert.alert).toHaveBeenCalledWith('Error', 'La contraseña debe tener al menos 8 caracteres.');
    });

    it("shows an alert when password is incorrect", () => {
        const {getByPlaceholderText, getByTestId} = render(<Login />);
        const nameInput = getByPlaceholderText("Email");
        fireEvent.changeText(nameInput, "test@example.com");
        const passwordInput = getByPlaceholderText("Contraseña");
        fireEvent.changeText(passwordInput, "123456789");
        getUserByEmail.mockResolvedValue({email: "test@example.com", password: "12345678"});
        const signInButton = getByTestId("sign-in-button");
        fireEvent.press(signInButton);
        waitFor(() => expect(Alert.alert).toHaveBeenCalledWith('Error', 'Contraseña incorrecta.'));
    });

    it("shows an alert when email is not found", () => {
        const {getByPlaceholderText, getByTestId} = render(<Login />);
        const nameInput = getByPlaceholderText("Email");
        fireEvent.changeText(nameInput, "test@example.com");
        const passwordInput = getByPlaceholderText("Contraseña");
        fireEvent.changeText(passwordInput, "12345678");
        getUserByEmail.mockResolvedValue(null);
        const signInButton = getByTestId("sign-in-button");
        fireEvent.press(signInButton);
        waitFor(() => expect(Alert.alert).toHaveBeenCalledWith('Error', 'Error al iniciar sesión. Inténtalo de nuevo. Comprueba que el email es correcto.'));
    });

    it("works when email and password are correct", () => {
        const {getByPlaceholderText, getByTestId} = render(<Login />);
        const nameInput = getByPlaceholderText("Email");
        fireEvent.changeText(nameInput, "test@example.com");
        const passwordInput = getByPlaceholderText("Contraseña");
        fireEvent.changeText(passwordInput, "12345678");
        getUserByEmail.mockResolvedValue({email: "test@example.com", password: "12345678"});
        const signInButton = getByTestId("sign-in-button");
        fireEvent.press(signInButton);
        waitFor(() => expect(router.replace).toHaveBeenCalledWith('livestock'));
    });

    it("handles Google sign-in", async () => {
        const mockPromptAsync = jest.fn().mockResolvedValue({ type: "success", params: { id_token: "mockToken" } });
        Google.useAuthRequest.mockReturnValue([{}, { type: "success", params: { id_token: "mockToken" } }, mockPromptAsync]);
        const { getByTestId } = render(<Login />);
        const googleButton = getByTestId("sign-in-google-button");
        fireEvent.press(googleButton);
        await waitFor(() => {
          expect(mockPromptAsync).toHaveBeenCalled();
          expect(insertUserGoogle).toHaveBeenCalledWith("Test User", "test@example.com", "googleId123");
          expect(router.replace).toHaveBeenCalledWith("livestock");
        });
    });
}); 