
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
    discountPercentage = 0,
    stock = 0,
    thumbnail,
    reviews = [],
  } = product;

  const { addToCart } = useCart();

  const averageRating =
    reviews.length > 0
      ? reviews.reduce(
          (sum, review) => sum + Number(review.rating || 0),
          0
        ) / reviews.length
      : 0;

  const rating = Math.min(5, Math.max(0, averageRating));
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const wantedLevel = Math.round(rating);

  const stockPercent =
    stock > 0 ? Math.min(100, (stock / 30) * 100) : 0;

  const stockStatus =
    stock <= 0
      ? "DEPLETED"
      : stock <= 5
        ? "CRITICAL"
        : stock <= 15
          ? "LOW"
          : "OPTIMAL";

  const stockClass =
    stock <= 0
      ? styles.depleted
      : stock <= 5
        ? styles.critical
        : stock <= 15
          ? styles.lowStock
          : styles.healthy;

  const originalPrice =
    discountPercentage > 0 && discountPercentage < 100
      ? price / (1 - discountPercentage / 100)
      : null;

  return (
    <article className={styles.productCard}>
      {/* Compact system header */}
      <div className={styles.cardHud}>
        <span>GRID / {String(id).padStart(4, "0")}</span>

        <span className={styles.liveIndicator}>
          <i />
          {stock > 0 ? "ONLINE" : "OFFLINE"}
        </span>
      </div>

      {/* Product image */}
      <div className={styles.productImageWrapper}>
        <Link
          to={`/products/${id}`}
          className={styles.imageLink}
          aria-label={`View ${title}`}
        >
          <img
            src={thumbnail}
            alt={title}
            className={styles.productImage}
            loading="lazy"
          />
        </Link>

        <span className={styles.imageCoordinates}>
          ITEM_{id}
        </span>

        {discountPercentage > 0 && (
          <span className={styles.discountBadge}>
            -{discountPercentage}%
          </span>
        )}
      </div>

      <div className={styles.productCardBody}>
        {/* Brand and rarity */}
        <div className={styles.brandRow}>
          <span className={styles.productBrand}>
            {brand || "GRID SELECT"}
          </span>

          <span className={styles.classification}>
            {wantedLevel >= 4
              ? "ELITE"
              : wantedLevel >= 2
                ? "RARE"
                : "STANDARD"}
          </span>
        </div>

        {/* Fixed title space */}
        <Link
          to={`/products/${id}`}
          className={styles.noDecoration}
        >
          <h2 className={styles.productTitle} title={title}>
            {title}
          </h2>
        </Link>

        {/* Consistent two-line description */}
        <p
          className={styles.productDescription}
          title={description}
        >
          {description}
        </p>

        {/* Wanted level / customer rating */}
        <section
          className={styles.wantedPanel}
          aria-label={`Rating ${rating.toFixed(1)} out of 5`}
        >
          <div className={styles.panelHeading}>
            <span>WANTED LEVEL</span>
            <span className={styles.levelNumber}>
              LVL {wantedLevel}
            </span>
          </div>

          <div className={styles.ratingRow}>
            <div className={styles.stars} aria-hidden="true">
              {[...Array(5)].map((_, index) => {
                const filled = index < fullStars;
                const half =
                  !filled &&
                  index === fullStars &&
                  hasHalfStar;

                return (
                  <span
                    key={index}
                    className={[
                      styles.star,
                      filled ? styles.filled : "",
                      half ? styles.half : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    ★
                  </span>
                );
              })}
            </div>

            <span className={styles.ratingNumber}>
              {rating.toFixed(1)}
            </span>

            <span className={styles.reviewCount}>
              ({reviews.length})
            </span>
          </div>

          <div className={styles.levelTrack} aria-hidden="true">
            {[1, 2, 3, 4, 5].map((level) => (
              <span
                key={level}
                className={
                  level <= wantedLevel
                    ? styles.levelActive
                    : ""
                }
              />
            ))}
          </div>
        </section>

        {/* Price */}
        <div className={styles.pricePanel}>
          <div className={styles.priceInfo}>
            <span className={styles.priceLabel}>
              ACQUISITION COST
            </span>

            <div className={styles.priceRow}>
              <span className={styles.price}>
                ${Number(price).toFixed(2)}
              </span>

              {originalPrice !== null && (
                <span className={styles.originalPrice}>
                  ${originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {discountPercentage > 0 && (
            <span className={styles.savingsBadge}>
              -{discountPercentage}%
            </span>
          )}
        </div>

        {/* Inventory health */}
        <section
          className={`${styles.stockPanel} ${stockClass}`}
          aria-label={`${stockStatus}: ${stock} units available`}
        >
          <div className={styles.stockTopRow}>
            <span className={styles.lifeIcon} aria-hidden="true">
              {stock <= 0 ? "×" : stock <= 5 ? "!" : "♥"}
            </span>

            <div className={styles.stockMeta}>
              <div className={styles.stockHeading}>
                <span>LIFE / STOCK</span>
                <span>{stockStatus}</span>
              </div>

              <div
                className={styles.healthTrack}
                role="meter"
                aria-label="Inventory level"
                aria-valuemin={0}
                aria-valuemax={30}
                aria-valuenow={Math.min(30, Math.max(0, stock))}
              >
                {[...Array(10)].map((_, index) => (
                  <span
                    key={index}
                    className={
                      index < Math.ceil(stockPercent / 10)
                        ? styles.healthSegmentActive
                        : ""
                    }
                  />
                ))}
              </div>

              <div className={styles.stockCount}>
                {stock > 0
                  ? `${stock} UNITS LEFT`
                  : "OUT OF STOCK"}
              </div>
            </div>
          </div>
        </section>

        {/* Always aligned at the bottom */}
        <button
          type="button"
          className={styles.productButton}
          disabled={stock <= 0}
          onClick={() => addToCart(product)}
        >
          <span className={styles.buttonIcon} aria-hidden="true">
            {stock > 0 ? "+" : "×"}
          </span>

          <span className={styles.buttonLabel}>
            {stock > 0 ? "ACQUIRE ITEM" : "UNAVAILABLE"}
          </span>

          {stock > 0 && (
            <span className={styles.buttonArrow} aria-hidden="true">
              ↗
            </span>
          )}
        </button>

        <div className={styles.cardFooter}>
          <span>SECURE SYSTEM</span>
          <span>TRON // 02.026</span>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;