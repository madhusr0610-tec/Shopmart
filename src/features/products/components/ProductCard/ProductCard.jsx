import styles from "./ProductCard.module.css";
import { Link } from "react-router-dom";
import { useCart } from "../../../cart/hooks/useCart";

const ProductCard = ({ product }) => {
  const {
    id,
    title,
    description,
    brand,
    price,
    discountPercentage,
    stock,
    thumbnail,
    reviews = [],
  } = product;
  const { addToCart } = useCart();

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) /
        reviews.length
      : 0;

  const roundedRating = averageRating.toFixed(1);
  const fullStars = Math.floor(averageRating);
  const hasHalfStar = averageRating - fullStars >= 0.5;

  return (
    <div className={styles.productCard}>
      <div className={styles.productImageWrapper}>
        <img
          src={thumbnail}
          alt={title}
          className={styles.productImage}
        />
      </div>

      <div className={styles.productCardBody}>
        <span className={styles.productBrand}>
          {brand || "Featured"}
        </span>

        <Link
          to={`/products/${id}`}
          className={styles.noDecoration}
        >
          <h5 className={styles.productTitle}>
            {title}
          </h5>
        </Link>

        <p className={styles.productDescription}>
          {description}
        </p>

        <div className={styles.productRating}>
          <div className={styles.stars}>
            {[...Array(5)].map((_, index) => {
              if (index < fullStars) {
                return (
                  <span
                    key={index}
                    className={`${styles.star} ${styles.filled}`}
                  >
                    ★
                  </span>
                );
              }

              if (index === fullStars && hasHalfStar) {
                return (
                  <span
                    key={index}
                    className={`${styles.star} ${styles.half}`}
                  >
                    ★
                  </span>
                );
              }

              return (
                <span
                  key={index}
                  className={styles.star}
                >
                  ★
                </span>
              );
            })}
          </div>

          <span className={styles.ratingNumber}>
            {roundedRating}
          </span>

          <span className={styles.reviewCount}>
            ({reviews.length})
          </span>
        </div>

        <div className={styles.productPrice}>
          <span className={styles.price}>
            ${price}
          </span>

          <span className={styles.discount}>
            -{discountPercentage}%
          </span>
        </div>

        <div
          className={`${styles.productStock} ${
            stock > 0
              ? styles.available
              : styles.unavailable
          }`}
        >
          <span className={styles.stockDot}></span>

          {stock > 0
            ? `${stock} units available`
            : "Out of stock"}
        </div>

        <button
          className={styles.productButton}
          disabled={stock <= 0}
          onClick={() => {
            addToCart(product);
          }}
        >
          <span>
            {stock > 0 ? "Add to Cart" : "Unavailable"}
          </span>

          {stock > 0 && (
            <span className={styles.buttonArrow}>
              →
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;