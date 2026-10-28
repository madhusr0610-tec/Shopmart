import { Link, useParams } from "react-router-dom";
import { useProduct } from "../../../features/products/hooks/useProducts";
import styles from "./ProductDetailsPage.module.css";

import { useCart } from "../../../features/cart/hooks/useCart";



const ProductDetailsPage = () => {
    const { productId } = useParams();

    // Fetch the product using the ID from the URL
    const { product, loading, error } = useProduct(productId);
    const { addToCart } = useCart(); 

    // Loading state
    if (loading) {
        return (
            <div className={styles.statusContainer}>
                <div
                    className="spinner-border text-primary"
                    role="status"
                >
                    <span className="visually-hidden">
                        Loading...
                    </span>
                </div>

                <p className="mt-3">Loading product details...</p>
            </div>
        );
    }

    // Error or product not found
    if (error || !product) {
        return (
            <div className={styles.statusContainer}>
                <h4>Unable to load product</h4>

                <p className="text-danger">
                    {error || "Product not found"}
                </p>

                <Link
                    to="/products"
                    className="btn btn-primary"
                >
                    Back to products
                </Link>
            </div>
        );
    }

    // Get product image
    const productImage =
        product.thumbnail ||
        product.images?.[0] ||
        "";

    // Calculate discounted price
    const discountedPrice = product.discountPercentage
        ? product.price *
          (1 - product.discountPercentage / 100)
        : product.price;

    // Rating out of 5
    const rating = Number(product.rating) || 0;

    return (
        <div className={`container py-4 ${styles.detailsPage}`}>

            {/* Back to products */}
            <div className="mb-4">
                <Link
                    to="/products"
                    className={styles.backLink}
                >
                    &larr; Back to products
                </Link>
            </div>

            {/* Product details */}
            <div className={`row g-4 ${styles.productCard}`}>

                {/* Product image */}
                <div className="col-12 col-md-6">
                    <div className={styles.imageContainer}>
                        {productImage ? (
                            <img
                                src={productImage}
                                alt={product.title}
                                className={styles.productImage}
                            />
                        ) : (
                            <div className={styles.noImage}>
                                No image available
                            </div>
                        )}
                    </div>
                </div>

                {/* Product information */}
                <div className="col-12 col-md-6">
                    <div className={styles.productInfo}>

                        {/* Category */}
                        <span className={styles.categoryBadge}>
                            {product.category || "Uncategorized"}
                        </span>

                        {/* Title */}
                        <h1 className={styles.productTitle}>
                            {product.title}
                        </h1>

                        {/* Rating */}
                        <div className={styles.ratingContainer}>
                            <span className={styles.ratingStars}>
                                {"★".repeat(
                                    Math.max(
                                        0,
                                        Math.min(5, Math.round(rating))
                                    )
                                )}
                                {"☆".repeat(
                                    5 -
                                    Math.max(
                                        0,
                                        Math.min(5, Math.round(rating))
                                    )
                                )}
                            </span>

                            <span className={styles.ratingValue}>
                                {rating.toFixed(1)} / 5
                            </span>
                        </div>

                        {/* Description */}
                        <h5 className="mt-4">Description</h5>

                        <p className={styles.description}>
                            {product.description ||
                                "No description available."}
                        </p>

                        {/* Price */}
                        <div className={styles.priceContainer}>

                            <span className={styles.currentPrice}>
                                ${discountedPrice.toFixed(2)}
                            </span>

                            {product.discountPercentage > 0 && (
                                <>
                                    <span
                                        className={styles.originalPrice}
                                    >
                                        ${Number(product.price).toFixed(2)}
                                    </span>

                                    <span
                                        className={styles.discountBadge}
                                    >
                                        {Math.round(
                                            product.discountPercentage
                                        )}% OFF
                                    </span>
                                </>
                            )}

                        </div>

                        {/* Stock information */}
                        {product.stock !== undefined && (
                            <p className={styles.stockInfo}>
                                {product.stock > 0
                                    ? `${product.stock} units available`
                                    : "Out of stock"}
                            </p>
                        )}

                        {/* Add to cart - functionality to be implemented */}
                        <button
                            type="button"
                            className={`btn btn-primary ${styles.addToCartButton}`}
                            disabled={product.stock === 0}
                                onClick ={() => addToCart(product)}
                        >
                            Add to cart
                        </button>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProductDetailsPage;