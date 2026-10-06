import { useProducts } from "../../../features/products/hooks/useProducts";

const ProductPage = () => {

    const { products, loading, error } = useProducts();

     if (loading)
      return (
        <div>
          Products still loading... 
        </div>
      );
  return (
    <>
    <div> Products Page </div>
    <ul>
      {
        products.map((prod) => {
          <li key={prod.id}>{prod.title}</li>
        })
      }
    </ul>
    </>
  );
};

export default ProductPage;