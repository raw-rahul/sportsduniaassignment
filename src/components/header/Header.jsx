import { Link } from "react-router-dom";
import { useState } from "react";
import "./Header.css";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={`header ${isOpen ? 'open' : ''}`}>
      <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </div>
      
      <nav className="header-nav">
        <Link to="/dashboard" className="header-link">
          Dashboard
        </Link>
        <Link to="/payout" className="header-link">
          Payout
        </Link>
      </nav>
    </header>
  );
};

export default Header;
