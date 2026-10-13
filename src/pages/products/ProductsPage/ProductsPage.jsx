import { useProducts } from "../../../features/products/hooks/useProducts";
import ProductCard from "../../../features/products/components/ProductCard/ProductCard";

const ProductsPage = () => {
  const { products, loading, error } = useProducts();

  console.log(products);

  if (loading) {
    return (
      <div className="container py-5">
        <div className="d-flex justify-content-center align-items-center">
          <span>Loading...</span>
          <div
            className="spinner-border text-primary"
            role="status"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-danger text-center">Error loading products: {error}</div>;
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Products</h2>

      <div className="row g-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="col-12 col-sm-6 col-md-4 col-lg-3"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;