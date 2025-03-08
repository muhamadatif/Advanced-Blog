import { Avatar, Dropdown } from "flowbite-react";
import { useSignout } from "../hooks/useSignout";
import { Link } from "react-router-dom";

/*eslint-disable */
function NavbarUserMenu({ currentUser }) {
  const { signout } = useSignout();

  return (
    <Dropdown
      arrowIcon={false}
      inline
      label={<Avatar alt="user" img={currentUser.profilePicture} rounded />}
    >
      <Dropdown.Header>
        <span className="block text-sm">@{currentUser.username}</span>
        <span className="block truncate text-sm font-medium">
          {currentUser.email}
        </span>
      </Dropdown.Header>
      <Link to={"dashboard?tab=profile"}>
        <Dropdown.Item>Profile</Dropdown.Item>
      </Link>
      <Dropdown.Divider />
      <Dropdown.Item onClick={() => signout()}>Sign out</Dropdown.Item>
    </Dropdown>
  );
}

export default NavbarUserMenu;
