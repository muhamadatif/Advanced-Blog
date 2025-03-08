import { Link } from "react-router-dom";

function HeaderLogo() {
  return (
    <Link
      to="/"
      className="self-center whitespace-nowrap text-sm font-semibold dark:text-white sm:text-xl"
    >
      <span className="rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-2 py-1 text-white">
        Mohamed&apos;s
      </span>
      Blog
    </Link>
  );
}

export default HeaderLogo;
