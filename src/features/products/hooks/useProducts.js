import {getProducts} from '../productApi';
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
                        setProducts(data);
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