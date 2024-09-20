import { useState } from "react";
import { Col, Row, Dropdown } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Message from "../components/Message";
import Meta from "../components/Meta";
import Paginate from "../components/Paginate";
import Product from "../components/Product";
import ProductCarousel from "../components/ProductCarousel";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Skeleton from "../components/Skeleton";

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const [filter, setFilter] = useState("");

  // Create an array with 12 elements
  const cards = Array.from({ length: 12 }, (_, index) => `Card ${index + 1}`);

  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    filter,
    pageNumber,
  });

  const handleFilter = (fil) => {
    setFilter(fil);
  };

  return (
    <>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light mb-4">
          Go Back
        </Link>
      )}
      {error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta />
          <Row className="align-items-center">
            <Col>
              {!keyword ? (
                <h2 style={{ opacity: 0.7 }}>Latest Products</h2>
              ) : (
                <h2 style={{ opacity: 0.7 }}>Search Products</h2>
              )}
            </Col>
            <Col className="text-end">
              {!keyword ? (
                <Dropdown>
                  <Dropdown.Toggle variant="primary" id="dropdown-basic">
                    Filter
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1" disabled>
                      Select Category
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleFilter("")}>
                      All Categories
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleFilter("Electronics")}>
                      Electronics
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleFilter("Kitchens")}>
                      Kitchens
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleFilter("Sports")}>
                      Sports
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleFilter("Kids")}>
                      Kids
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleFilter("Clothing & Shoes")}
                    >
                      Clothing & Shoes
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => handleFilter("Health & Beauty")}
                    >
                      Health & Beauty
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <></>
              )}
            </Col>
          </Row>

          {isLoading ? (
            <Row>
              {cards.map((index) => (
                <Col key={index} sm={12} md={6} lg={4} xl={3}>
                  <Skeleton />
                </Col>
              ))}
            </Row>
          ) : (
            <Row>
              <Row className="mb-4">
                {data?.products && data.products.length > 0 ? (
                  data?.products.map((product) => (
                    <Col
                      key={product._id}
                      className="mt-2"
                      sm={12}
                      md={6}
                      lg={4}
                      xl={3}
                    >
                      <Product product={product} />
                    </Col>
                  ))
                ) : (
                  <Col
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "30vh" }}
                  >
                    <p style={{ opacity: 0.5 }}>Products not available</p>
                  </Col>
                )}
              </Row>
              <Paginate
                pages={data.pages}
                page={data.page}
                keyword={keyword ? keyword : ""}
              />
            </Row>
          )}
        </>
      )}
    </>
  );
};

export default HomeScreen;
