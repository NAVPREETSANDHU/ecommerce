import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Rating = ({ value, text, color }) => {
  return (
    <div className="rating">
      <span>
        {value >= 1 ? (
          <FaStar style={{ color }} aria-label="full star" />
        ) : value >= 0.5 ? (
          <FaStarHalfAlt style={{ color }} aria-label="half star" />
        ) : (
          <FaRegStar style={{ color }} aria-label="empty star" />
        )}
      </span>
      <span>
        {value >= 2 ? (
          <FaStar style={{ color }} aria-label="full star" />
        ) : value >= 1.5 ? (
          <FaStarHalfAlt style={{ color }} aria-label="half star" />
        ) : (
          <FaRegStar style={{ color }} aria-label="empty star" />
        )}
      </span>
      <span>
        {value >= 3 ? (
          <FaStar style={{ color }} aria-label="full star" />
        ) : value >= 2.5 ? (
          <FaStarHalfAlt style={{ color }} aria-label="half star" />
        ) : (
          <FaRegStar style={{ color }} aria-label="empty star" />
        )}
      </span>
      <span>
        {value >= 4 ? (
          <FaStar style={{ color }} aria-label="full star" />
        ) : value >= 3.5 ? (
          <FaStarHalfAlt style={{ color }} aria-label="half star" />
        ) : (
          <FaRegStar style={{ color }} aria-label="empty star" />
        )}
      </span>
      <span>
        {value >= 5 ? (
          <FaStar style={{ color }} aria-label="full star" />
        ) : value >= 4.5 ? (
          <FaStarHalfAlt style={{ color }} aria-label="half star" />
        ) : (
          <FaRegStar style={{ color }} aria-label="empty star" />
        )}
      </span>
      {text && <span className="rating-text">{text}</span>}
    </div>
  );
};

Rating.defaultProps = {
  color: "#f8e825",
};

export default Rating;
