import { Helmet } from "react-helmet-async";

//Meta component
const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keyword" content={keywords} />
    </Helmet>
  );
};

//Meta default data
Meta.defaultProps = {
  title: "Welcome To Bazaarlia",
  description: "We sell the best products for cheap all over Australia",
  keywords:
    "shoes, kids, ecommerce, electronics, buy electronics, cheap electroincs",
};

export default Meta;
