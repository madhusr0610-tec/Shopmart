import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import {Outlet} from "react-router-dom";

const PageLayout = () => {
    return (
        <>
            <header>
                <Navbar />
            </header>
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default PageLayout;