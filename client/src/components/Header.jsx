import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { useAuthUser } from "../hooks/useAuthUser";
import HeaderLogo from "./HeaderLogo";
import SearchForm from "./SearchForm";
import NavbarUserMenu from "./NavbarUserMenu";
export default function Header() {
  const currentUser = useAuthUser();
  const path = useLocation().pathname;
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  return (
    <Navbar className="border-b-2">
      <HeaderLogo />
      <SearchForm />
      <Link to="/search">
        <Button className="h-10 w-12 lg:hidden" color="gray" pill>
          <AiOutlineSearch />
        </Button>
      </Link>
      <div className="flex gap-2 md:order-2">
        <Button
          className="hidden h-10 w-12 sm:inline"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <NavbarUserMenu currentUser={currentUser} />
        ) : (
          <Link to="/sign-in">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to="/about">About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to="/projects">Projects</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
