import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const {
    title,
    description,
    brand,
    price,
    discountPercentage,
    stock,
    thumbnail,
    reviews = [],
  } = product;

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) /
        reviews.length
      : 0;

  const roundedRating = averageRating.toFixed(1);
  const fullStars = Math.floor(averageRating);
  const hasHalfStar = averageRating - fullStars >= 0.5;

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        <img
          src={thumbnail}
          alt={title}
          className="product-image"
        />
      </div>

      <div className="product-card-body">
        <span className="product-brand">
          {brand || "Featured"}
        </span>

        <h5 className="product-title">{title}</h5>

        <p className="product-description">
          {description}
        </p>

        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, index) => {
              if (index < fullStars) {
                return (
                  <span key={index} className="star filled">
                    ★
                  </span>
                );
              }

              if (index === fullStars && hasHalfStar) {
                return (
                  <span key={index} className="star half">
                    ★
                  </span>
                );
              }

              return (
                <span key={index} className="star">
                  ★
                </span>
              );
            })}
          </div>

          <span className="rating-number">
            {roundedRating}
          </span>

          <span className="review-count">
            ({reviews.length})
          </span>
        </div>

        <div className="product-price">
          <span className="price">${price}</span>

          <span className="discount">
            -{discountPercentage}%
          </span>
        </div>

        <div
          className={
            stock > 0
              ? "product-stock available"
              : "product-stock unavailable"
          }
        >
          <span className="stock-dot"></span>

          {stock > 0
            ? `${stock} units available`
            : "Out of stock"}
        </div>

        <button
          className="product-button"
          disabled={stock <= 0}
        >
          <span>
            {stock > 0 ? "Add to Cart" : "Unavailable"}
          </span>

          {stock > 0 && (
            <span className="button-arrow">→</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;