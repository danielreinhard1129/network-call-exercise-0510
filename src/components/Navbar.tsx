import { Navbar } from "flowbite-react";
import { Link } from "react-router-dom";

const NavbarComp = () => {
  return (
    <Navbar fluid rounded className="container mx-auto">
      <Navbar.Brand as={Link} to="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Network Call Practice
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link as={Link} to="/" active>
          Users
        </Navbar.Link>
        <Navbar.Link as={Link} to="/register">
          Register
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComp;
