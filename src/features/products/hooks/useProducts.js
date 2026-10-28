import {getProducts, getProduct} from '../productApi';
import { useEffect, useState } from 'react';

export function useProducts() {

    // Initializing states 
        // ---
    // provides the product array for rendering
    const [products, setProducts] = useState([]);
    // Loading flag will be set to false after product data is loaded into products state
    const[loading, setLoading] = useState(true);
    // Error state
    const[error, setError] = useState("");

    // Logic for fetching product data and setting the state

    useEffect(
        () => {
            let active = true;

            // Effect logic 
                // ---
            // product fetch logic
            async function loadProducts() {
                // Loading products could sometimes have Exceptions
                try {
                    setLoading(true);
                    setError("");

                    // trying to fetch data
                    const data = await getProducts();
                    
                    if (active){
                        setProducts(data.products);
                    }
                }
                // If product loading failed
                catch(err){
                    if (active){
                        setError(err?.response?.data?.message || err.message || "Failed to load products");
                    }
                    }
                finally{
                if (active) {
                    // loading is complete, so turning to false
                    setLoading(false);
                    }
                }
            }
        
        // attempting product loading
        loadProducts();
        return () => {
            // Cleanup code
            active = false;
        };
        // dependency array -> empty here
    },[]);

    return {
        products, loading, error
    };
}

// Fetching single product
export function useProduct(productId) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        async function loadProduct() {
            try {
                setLoading(true);
                setError("");
                setProduct(null);

                if (!productId) {
                    throw new Error("Product ID is missing");
                }

                const data = await getProduct(productId);

                if (active) {
                    setProduct(data);
                }
            } catch (err) {
                if (active) {
                    setError(
                        err?.response?.data?.message ||
                        err.message ||
                        "Failed to load product"
                    );
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        loadProduct();

        return () => {
            active = false;
        };
    }, [productId]);

    return { product, loading, error };
}