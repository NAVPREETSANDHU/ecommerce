import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import "../css/Product.css";

const Product = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className="product-card-link">
      <Card className="product-card">
        <Card.Img src={product.image} variant="top" className="product-image" />

        <Card.Body>
          <Card.Title as="div" className="product-title">
            <strong>{product.name}</strong>
          </Card.Title>

          <Card.Text as="div">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Card.Text>

          <Card.Text as="h3">${product.price}</Card.Text>
        </Card.Body>
      </Card>
    </Link>
  );
};

export default Product;
