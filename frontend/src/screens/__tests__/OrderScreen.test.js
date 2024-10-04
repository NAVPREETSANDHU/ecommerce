import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import OrderScreen from "../OrderScreen";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useDeliverOrderMutation,
  useTrackingOrderMutation,
  useGetPaypalClientIdQuery,
} from "../../slices/ordersApiSlice"; 

jest.mock("../../slices/ordersApiSlice", () => ({
  useGetOrderDetailsQuery: jest.fn(),
  usePayOrderMutation: jest.fn(),
  useDeliverOrderMutation: jest.fn(),
  useTrackingOrderMutation: jest.fn(),
  useGetPaypalClientIdQuery: jest.fn(),
}));

const mockStore = configureStore([]);

describe("OrderScreen", () => {
  const initialState = {
    auth: { userInfo: { isAdmin: true } },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("handles payment error", async () => {
    const store = mockStore(initialState);
    
    // Mock the order details to ensure the component can render
    const orderDetails = { _id: "123", totalPrice: 100, isPaid: false };

    // Mock the hooks
    useGetOrderDetailsQuery.mockReturnValue({
      data: orderDetails,
      isLoading: false,
    });

    const payOrder = jest.fn().mockRejectedValue({ data: { message: "Payment failed" } });
    usePayOrderMutation.mockReturnValue([payOrder, { isLoading: false }]);

    const deliverOrder = jest.fn();
    useDeliverOrderMutation.mockReturnValue([deliverOrder, { isLoading: false }]);

    const trackingOrder = jest.fn();
    useTrackingOrderMutation.mockReturnValue([trackingOrder, { isLoading: false }]);

    // Mock PayPal Client ID retrieval
    useGetPaypalClientIdQuery.mockReturnValue({
      data: { clientId: "fake-client-id" },
      isLoading: false,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <PayPalScriptProvider options={{ "client-id": "fake-client-id" }}>
            <OrderScreen />
          </PayPalScriptProvider>
        </MemoryRouter>
      </Provider>
    );
  });
});
