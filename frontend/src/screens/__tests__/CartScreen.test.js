// CartScreen.test.js
import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import CartScreen from "../CartScreen";

const mockStore = configureStore([]);

const renderCartScreen = (initialState) => {
  const store = mockStore(initialState);
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <CartScreen />
      </BrowserRouter>
    </Provider>
  );
};

describe("CartScreen Component", () => {
  test("renders empty cart message when cart is empty", () => {
    const initialState = {
      cart: {
        cartItems: [],
      },
    };

    const { getByText } = renderCartScreen(initialState);

    expect(getByText(/Your cart is empty/i)).toBeInTheDocument();
    expect(getByText(/Go Back/i)).toBeInTheDocument();
  });

  test("disables checkout button when cart is empty", () => {
    const initialState = {
      cart: {
        cartItems: [],
      },
    };

    const { getByRole } = renderCartScreen(initialState);
    const checkoutButton = getByRole("button", {
      name: /Proceed To Checkout/i,
    });

    expect(checkoutButton).toBeDisabled();
  });

  test("enables checkout button when cart has items", () => {
    const initialState = {
      cart: {
        cartItems: [
          {
            _id: "1",
            name: "Test Product",
            image: "http://example.com/image.jpg",
            price: 29.99,
            qty: 1,
            countInStock: 5,
          },
        ],
      },
    };

    const { getByRole } = renderCartScreen(initialState);
    const checkoutButton = getByRole("button", {
      name: /Proceed To Checkout/i,
    });

    expect(checkoutButton).toBeEnabled();
  });
});
