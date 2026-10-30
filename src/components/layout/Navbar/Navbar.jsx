import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../../../features/cart/hooks/useCart";
import styles from "./Navbar.module.css";

const Navbar = () => {
    const { cartCount } = useCart();
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const closeMenu = () => setMenuOpen(false);

    const navClass = ({ isActive }) =>
        `${styles.navLink} ${isActive ? styles.active : ""}`;

    const handleSearch = (event) => {
        event.preventDefault();

        const query = searchTerm.trim();

        if (query) {
            closeMenu();
            window.location.href =
                `/products?search=${encodeURIComponent(query)}`;
        }
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navContainer}>
                {/* Brand */}
                <Link
                    to="/"
                    className={styles.brand}
                    onClick={closeMenu}
                    aria-label="Q-Shop home"
                >
                    <span className={styles.brandIcon}>
                        <span>Q</span>
                    </span>

                    <span className={styles.brandText}>
                        Q<span>-SHOP</span>
                        <small>THE DIGITAL GRID</small>
                    </span>
                </Link>

                {/* Mobile Toggle */}
                <button
                    type="button"
                    className={`${styles.menuToggle} ${
                        menuOpen ? styles.menuToggleOpen : ""
                    }`}
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label={
                        menuOpen ? "Close navigation" : "Open navigation"
                    }
                    aria-expanded={menuOpen}
                    aria-controls="qshop-navigation"
                >
                    <span />
                    <span />
                    <span />
                </button>

                {/* Navigation */}
                <div
                    id="qshop-navigation"
                    className={`${styles.navigation} ${
                        menuOpen ? styles.navigationOpen : ""
                    }`}
                >
                    <div className={styles.navLinks}>
                        <NavLink
                            to="/"
                            end
                            className={navClass}
                            onClick={closeMenu}
                        >
                            <span className={styles.navIndex}>01</span>
                            HOME
                        </NavLink>

                        <NavLink
                            to="/products"
                            className={navClass}
                            onClick={closeMenu}
                        >
                            <span className={styles.navIndex}>02</span>
                            PRODUCTS
                        </NavLink>

                        <NavLink
                            to="/about"
                            className={navClass}
                            onClick={closeMenu}
                        >
                            <span className={styles.navIndex}>03</span>
                            ABOUT
                        </NavLink>

                        <NavLink
                            to="/contact"
                            className={navClass}
                            onClick={closeMenu}
                        >
                            <span className={styles.navIndex}>04</span>
                            CONTACT
                        </NavLink>

                        <NavLink
                            to="/cart"
                            className={({ isActive }) =>
                                `${styles.navLink} ${styles.cartLink} ${
                                    isActive ? styles.active : ""
                                }`
                            }
                            onClick={closeMenu}
                        >
                            <span className={styles.navIndex}>05</span>
                            CART

                            <span className={styles.cartBadge}>
                                {cartCount > 99 ? "99+" : cartCount}
                            </span>
                        </NavLink>
                    </div>

                    {/* Search */}
                    <form
                        className={styles.searchForm}
                        role="search"
                        onSubmit={handleSearch}
                    >
                        <span
                            className={styles.searchIcon}
                            aria-hidden="true"
                        >
                            ⌕
                        </span>

                        <input
                            type="search"
                            value={searchTerm}
                            onChange={(event) =>
                                setSearchTerm(event.target.value)
                            }
                            placeholder="SEARCH GRID..."
                            aria-label="Search products"
                        />

                        <button
                            type="submit"
                            aria-label="Submit search"
                        >
                            ↗
                        </button>
                    </form>

                    {/* System Status */}
                    <div className={styles.systemStatus}>
                        <span className={styles.statusDot} />
                        ONLINE
                    </div>

                    {/* Authentication */}
                    <div className={styles.authActions}>
                        <NavLink
                            to="/login"
                            className={({ isActive }) =>
                                `${styles.loginLink} ${
                                    isActive ? styles.authActive : ""
                                }`
                            }
                            onClick={closeMenu}
                        >
                            LOG IN
                        </NavLink>

                        <Link
                            to="/register"
                            className={styles.registerLink}
                            onClick={closeMenu}
                        >
                            REGISTER <span>↗</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Neon bottom border */}
            <div className={styles.neonRail}>
                <span />
            </div>
        </nav>
    );
};

export default Navbar;