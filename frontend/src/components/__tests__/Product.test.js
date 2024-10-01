import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Product from '../Product';

const mockProduct = {
  _id: '00xs00sf0012345',
  name: 'Test Product',
  image: 'http://example.com/image.jpg',
  rating: 4.5,
  numReviews: 10,
  price: 29.99,
};

const renderProduct = (product) => {
  return render(
    <BrowserRouter>
      <Product product={product} />
    </BrowserRouter>
  );
};

test('renders Product component with correct information', () => {
  const { getByText, getByRole } = renderProduct(mockProduct);

  // Check if product name is rendered
  expect(getByText(/Test Product/i)).toBeInTheDocument();

  // Check if product image is rendered
  const productImage = getByRole('img');
  expect(productImage).toHaveAttribute('src', mockProduct.image);

  // Check if rating is displayed
  expect(getByText(/10 reviews/i)).toBeInTheDocument();
  
  // Check if product price is rendered
  expect(getByText('$29.99')).toBeInTheDocument();
});
