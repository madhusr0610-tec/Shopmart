import HomePage from "../pages/HomePage/HomePage"
import ContactPage from "../pages/ContactPage/ContactPage";
import AboutPage from "../pages/AboutPage/AboutPage";

// Products
import ProductsPage from "../pages/products/ProductsPage/ProductsPage";

import PageLayout from "../components/layout/PageLayout/PageLayout";

import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <PageLayout />,
        children: [
            { index: true, element: <HomePage /> },
            { path: "contact", element: <ContactPage /> },
            { path: "about", element: <AboutPage /> },
            {
                path:"products",
                children: [
                    { index: true, element: <ProductsPage/>},
                ]
            }
        ]
    },
]);