const Footer = () => {
  return (
    <p className="border-top pt-3 text-center">
      <span>
        Real<i className="bi bi-geo-fill"></i>App
      </span>
      <span className="ms-1">&copy;</span>
      <span className="ms-1">{new Date().getFullYear()}</span>
    </p>
  );
};

export default Footer;
