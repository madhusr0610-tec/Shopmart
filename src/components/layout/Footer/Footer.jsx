const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white mt-auto">
      <div className="container py-5">
        <div className="row gy-4">
          <div className="col-md-4">
            <h5 className="mb-3">E-comm</h5>
            <p className="mb-0 text-white-50">
              Everything you need, delivered simply.
            </p>
          </div>

          <div className="col-6 col-md-2">
            <h6 className="mb-3">Shop</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2"><a className="link-light text-decoration-none" href="/">Home</a></li>
              <li><a className="link-light text-decoration-none" href="/products">Products</a></li>
            </ul>
          </div>

          <div className="col-6 col-md-2">
            <h6 className="mb-3">Company</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2"><a className="link-light text-decoration-none" href="/about">About us</a></li>
              <li><a className="link-light text-decoration-none" href="/contact">Contact</a></li>
            </ul>
          </div>

          <div className="col-md-4">
            <h6 className="mb-3">Need help?</h6>
            <p className="mb-0 text-white-50">
              Email us at <a className="link-light" href="mailto:support@ecomm.com">support@ecomm.com</a>
            </p>
          </div>
        </div>
      </div>

      <div className="border-top border-secondary">
        <div className="container py-3 text-center text-md-start text-white-50 small">
          © {currentYear} E-comm. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;