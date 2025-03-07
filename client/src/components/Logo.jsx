import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <div className="flex-1">
      <Link to="/" className="text-4xl font-extrabold text-white">
        <span className="rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-3 py-2 text-white shadow-lg">
          Mohamed&apos;s
        </span>
        <span className="ml-2 text-pink-400">Blog</span>
      </Link>
      <p className="mt-4 text-sm leading-relaxed">
        Join <span className="font-bold">Mohamed&apos;s Blog</span> today and
        start sharing your thoughts with the world! Sign up using your email or
        quickly continue with Google.
      </p>
    </div>
  );
};
