import React from "react";

import { render, waitFor, fireEvent } from "@testing-library/react-native";
import { router } from "expo-router";
import { Alert } from "react-native";

import ChangePassword from "../../../../app/(tabs)/(profile)/change-password";
import { getUserByEmail, changePassword } from "../../../../app/model/users";

jest.mock("../../../../store/user-provider", () => ({
  useUser: jest.fn(() => ({
    user: {
      id: "1",
      name: "TestUser",
      email: "test@test.com",
      password: "12345678",
    },
    login: jest.fn(),
  })),
}));

jest.mock("expo-router", () => ({
  router: {
    replace: jest.fn(),
    push: jest.fn(),
  },
}));

jest.mock("@fortawesome/react-native-fontawesome", () => ({
  FontAwesomeIcon: () => null,
}));

jest.mock("../../../../app/model/users", () => ({
  getUserByEmail: jest.fn(),
  changePassword: jest.fn(),
}));

jest.spyOn(Alert, "alert");

describe("ChangePassword", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render correctly", async () => {
    const tree = render(<ChangePassword />);
    expect(tree).toMatchSnapshot();
  });

  it("should change password if actual password is correct", async () => {
    changePassword.mockResolvedValueOnce(true);
    const { getByPlaceholderText, getByTestId } = render(<ChangePassword />);
    const actualPasswordInput = getByPlaceholderText("Contraseña actual");
    fireEvent.changeText(actualPasswordInput, "12345678");
    const newPasswordInput = getByPlaceholderText("Nueva contraseña");
    fireEvent.changeText(newPasswordInput, "123456789");
    const confirmNewPasswordInput = getByPlaceholderText(
      "Confirmar nueva contraseña"
    );
    fireEvent.changeText(confirmNewPasswordInput, "123456789");
    getUserByEmail.mockResolvedValue({
      email: "test@example.com",
      password: "12345678",
    });
    const changePasswordButton = getByTestId("change-password-button");
    fireEvent.press(changePasswordButton);
    await waitFor(() => expect(router.replace).toHaveBeenCalledWith("profile"));
  });

  it("should show an error if user is logged with google", async () => {
    const useUserMock =
      require("../../../../store/user-provider").useUser;
    useUserMock.mockReturnValue({
      user: {
        id: "1",
        name: "TestUser",
        email: "test@test.com",
        password: null,
      },
    });
    const { getByPlaceholderText, getByTestId } = render(<ChangePassword />);
    const actualPasswordInput = getByPlaceholderText("Contraseña actual");
    fireEvent.changeText(actualPasswordInput, "12345678");
    const newPasswordInput = getByPlaceholderText("Nueva contraseña");
    fireEvent.changeText(newPasswordInput, "123456789");
    const confirmNewPasswordInput = getByPlaceholderText(
      "Confirmar nueva contraseña"
    );
    fireEvent.changeText(confirmNewPasswordInput, "123456789");
    getUserByEmail.mockResolvedValue({
      email: "test@example.com",
      password: null,
    });
    const changePasswordButton = getByTestId("change-password-button");
    fireEvent.press(changePasswordButton);
    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "Solo podrás cambiar la contraseña si no has iniciado sesión con Google."
    );
  });

  it("should show an error if actual password is empty", async () => {
    const useUserMock =
      require("../../../../store/user-provider").useUser;
    useUserMock.mockReturnValue({
      user: {
        id: "1",
        name: "TestUser",
        email: "test@test.com",
        password: "12345678",
      },
    });
    const { getByPlaceholderText, getByTestId } = render(<ChangePassword />);
    const newPasswordInput = getByPlaceholderText("Nueva contraseña");
    fireEvent.changeText(newPasswordInput, "123456789");
    const confirmNewPasswordInput = getByPlaceholderText(
      "Confirmar nueva contraseña"
    );
    fireEvent.changeText(confirmNewPasswordInput, "123456789");
    const changePasswordButton = getByTestId("change-password-button");
    fireEvent.press(changePasswordButton);
    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "Por favor, rellena todos los campos."
    );
  });

  it("should show an error if actual password is not the same as the user password", async () => {
    const { getByPlaceholderText, getByTestId } = render(<ChangePassword />);
    const actualPasswordInput = getByPlaceholderText("Contraseña actual");
    fireEvent.changeText(actualPasswordInput, "12345656");
    const newPasswordInput = getByPlaceholderText("Nueva contraseña");
    fireEvent.changeText(newPasswordInput, "123456789");
    const confirmNewPasswordInput = getByPlaceholderText(
      "Confirmar nueva contraseña"
    );
    fireEvent.changeText(confirmNewPasswordInput, "123456789");
    getUserByEmail.mockResolvedValue({
      email: "test@example.com",
      password: "123456789",
    });
    const changePasswordButton = getByTestId("change-password-button");
    fireEvent.press(changePasswordButton);
    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "La contraseña actual no es correcta."
    );
  });

  it("should show an error if new password is empty", async () => {
    const { getByPlaceholderText, getByTestId } = render(<ChangePassword />);
    const actualPasswordInput = getByPlaceholderText("Contraseña actual");
    fireEvent.changeText(actualPasswordInput, "12345678");
    const confirmNewPasswordInput = getByPlaceholderText(
      "Confirmar nueva contraseña"
    );
    fireEvent.changeText(confirmNewPasswordInput, "123456789");
    const changePasswordButton = getByTestId("change-password-button");
    fireEvent.press(changePasswordButton);
    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "Por favor, rellena todos los campos."
    );
  });

  it("should show an error if confirm new password is empty", async () => {
    const { getByPlaceholderText, getByTestId } = render(<ChangePassword />);
    const actualPasswordInput = getByPlaceholderText("Contraseña actual");
    fireEvent.changeText(actualPasswordInput, "12345678");
    const newPasswordInput = getByPlaceholderText("Nueva contraseña");
    fireEvent.changeText(newPasswordInput, "123456789");
    const changePasswordButton = getByTestId("change-password-button");
    fireEvent.press(changePasswordButton);
    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "Por favor, rellena todos los campos."
    );
  });

  it("should show an error if new password is different from confirm new password", async () => {
    const { getByPlaceholderText, getByTestId } = render(<ChangePassword />);
    const actualPasswordInput = getByPlaceholderText("Contraseña actual");
    fireEvent.changeText(actualPasswordInput, "12345678");
    const newPasswordInput = getByPlaceholderText("Nueva contraseña");
    fireEvent.changeText(newPasswordInput, "123456789");
    const confirmNewPasswordInput = getByPlaceholderText(
      "Confirmar nueva contraseña"
    );
    fireEvent.changeText(confirmNewPasswordInput, "12345678");
    const changePasswordButton = getByTestId("change-password-button");
    fireEvent.press(changePasswordButton);
    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "Las contraseñas no coinciden."
    );
  });

  it("should show an error if new password is less than 8 characters", async () => {
    const { getByPlaceholderText, getByTestId } = render(<ChangePassword />);
    const actualPasswordInput = getByPlaceholderText("Contraseña actual");
    fireEvent.changeText(actualPasswordInput, "12345678");
    const newPasswordInput = getByPlaceholderText("Nueva contraseña");
    fireEvent.changeText(newPasswordInput, "1234567");
    const confirmNewPasswordInput = getByPlaceholderText(
      "Confirmar nueva contraseña"
    );
    fireEvent.changeText(confirmNewPasswordInput, "1234567");
    const changePasswordButton = getByTestId("change-password-button");
    fireEvent.press(changePasswordButton);
    expect(Alert.alert).toHaveBeenCalledWith(
      "Error",
      "La contraseña debe tener al menos 8 caracteres."
    );
  });

  it("should show an error if actual password is incorrect", async () => {
    const { getByPlaceholderText, getByTestId } = render(<ChangePassword />);
    const actualPasswordInput = getByPlaceholderText("Contraseña actual");
    fireEvent.changeText(actualPasswordInput, "12345678");
    const newPasswordInput = getByPlaceholderText("Nueva contraseña");
    fireEvent.changeText(newPasswordInput, "12345678");
    const confirmNewPasswordInput = getByPlaceholderText(
      "Confirmar nueva contraseña"
    );
    fireEvent.changeText(confirmNewPasswordInput, "123456789");
    getUserByEmail.mockResolvedValue({
      email: "test@example.com",
      password: "12345678",
    });
    const changePasswordButton = getByTestId("change-password-button");
    fireEvent.press(changePasswordButton);
    waitFor(() =>
      expect(Alert.alert).toHaveBeenCalledWith(
        "Error",
        "La contraseña actual no es correcta."
      )
    );
  });

  it("should show an error if new password is the same as the actual", async () => {
    const { getByPlaceholderText, getByTestId } = render(<ChangePassword />);
    const actualPasswordInput = getByPlaceholderText("Contraseña actual");
    fireEvent.changeText(actualPasswordInput, "12345678");
    const newPasswordInput = getByPlaceholderText("Nueva contraseña");
    fireEvent.changeText(newPasswordInput, "12345678");
    const confirmNewPasswordInput = getByPlaceholderText(
      "Confirmar nueva contraseña"
    );
    fireEvent.changeText(confirmNewPasswordInput, "12345678");
    getUserByEmail.mockResolvedValue({
      email: "test@example.com",
      password: "12345678",
    });
    const changePasswordButton = getByTestId("change-password-button");
    fireEvent.press(changePasswordButton);
    waitFor(() =>
      expect(Alert.alert).toHaveBeenCalledWith(
        "Error",
        "La nueva contraseña debe ser diferente a la actual."
      )
    );
  });
});
