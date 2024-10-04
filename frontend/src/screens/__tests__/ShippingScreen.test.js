import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ShippingScreen from '../ShippingScreen';
import { saveShippingAddress } from '../../slices/cartSlice';
import { useDispatch } from 'react-redux';
import * as reactRouterDom from 'react-router-dom';

const mockStore = configureStore([]);

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('ShippingScreen', () => {
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
      cart: { shippingAddress: {} }, // Initial empty shipping address
    });
  });

  it('renders the shipping form', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/shipping']}>
          <ShippingScreen />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText(/address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/city/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/postal code/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/country/i)).toBeInTheDocument();
  });

  it('dispatches saveShippingAddress and navigates on form submission', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/shipping']}>
          <ShippingScreen />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/address/i), { target: { value: '123 Main St' } });
    fireEvent.change(screen.getByLabelText(/city/i), { target: { value: 'Sample City' } });
    fireEvent.change(screen.getByLabelText(/postal code/i), { target: { value: '12345' } });
    fireEvent.change(screen.getByLabelText(/country/i), { target: { value: 'Sample Country' } });
    
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    expect(dispatch).toHaveBeenCalledWith(saveShippingAddress({
      address: '123 Main St',
      city: 'Sample City',
      postalCode: '12345',
      country: 'Sample Country',
    }));
    expect(navigate).toHaveBeenCalledWith('/payment'); // Check for navigation
  });
});
