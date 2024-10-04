import React from "react";
import { Placeholder } from "react-bootstrap";

//Carousel skelton component
const CarouselSkeleton = () => (
  <div style={{ height: "400px", position: "relative" }}>
    <Placeholder as="div" animation="glow" style={{ height: "100%" }}>
      <Placeholder xs={12} style={{ height: "100%", marginBottom: "10px" }} />
    </Placeholder>
    <Placeholder
      as="div"
      animation="glow"
      style={{
        position: "absolute",
        bottom: "10px",
        left: "10px",
        width: "50%",
      }}
    >
      <Placeholder xs={6} md={12} />
    </Placeholder>
  </div>
);

export default CarouselSkeleton;
