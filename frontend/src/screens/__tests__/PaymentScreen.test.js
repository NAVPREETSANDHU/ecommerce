// src/screens/__tests__/PaymentScreen.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import PaymentScreen from "../PaymentScreen";
import { savePaymentMethod } from "../../slices/cartSlice";
import { useDispatch } from "react-redux";
import * as reactRouterDom from "react-router-dom";

const mockStore = configureStore([]);

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("PaymentScreen", () => {
  let store;
  let dispatch;
  let navigate;

  beforeEach(() => {
    dispatch = jest.fn();
    useDispatch.mockReturnValue(dispatch);

    // Mock navigate
    navigate = jest.fn();
    reactRouterDom.useNavigate.mockReturnValue(navigate);

    store = mockStore({
      cart: { shippingAddress: {} }, // Simulate no shipping address
    });
  });

  it("redirects to shipping if no shipping address", () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/payment"]}>
          <PaymentScreen />
        </MemoryRouter>
      </Provider>
    );

    // Assert that the navigation to shipping happened
    expect(navigate).toHaveBeenCalledWith("/shipping");
  });

  it("dispatches savePaymentMethod and navigates on form submission", () => {
    store = mockStore({
      cart: { shippingAddress: { address: "123 Main St" } }, // Simulate existing shipping address
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/payment"]}>
          <PaymentScreen />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByLabelText(/PayPal or Credit Card/i));
    fireEvent.click(screen.getByRole("button", { name: /continue/i }));

    expect(dispatch).toHaveBeenCalledWith(savePaymentMethod("PayPal"));
    expect(navigate).toHaveBeenCalledWith("/placeorder"); // Check for navigation
  });
});
