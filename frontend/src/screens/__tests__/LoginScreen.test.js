import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import LoginScreen from "../LoginScreen";
import { useLoginMutation, useForgotPasswordMutation } from '../../slices/usersApiSlice';

const mockStore = configureStore([]);
const store = mockStore({ auth: { userInfo: null } }); // Initial state

jest.mock("../../slices/usersApiSlice");

describe("LoginScreen", () => {
  const mockLogin = jest.fn();
  const mockForgotPassword = jest.fn();

  beforeEach(() => {
    useLoginMutation.mockReturnValue([mockLogin, { isLoading: false }]);
    useForgotPasswordMutation.mockReturnValue([mockForgotPassword]); // Mock the forgot password mutation
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("shows loader when logging in", async () => {
    useLoginMutation.mockReturnValue([mockLogin, { isLoading: true }]);

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginScreen />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    expect(screen.getByRole("button", { name: /sign in/i })).toBeDisabled();
  });

  it('renders the login form', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginScreen />
        </MemoryRouter>
      </Provider>
    );
  
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });
  
});
