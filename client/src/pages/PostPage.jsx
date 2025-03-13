import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";
import DOMPurify from "dompurify"; // It's used to prevent Cross-Site Scripting (XSS) vulnerabilities from adding a user
import CallToAction from "../components/CallToAction";
import PostCard from "../components/PostCard";
import { useGetPost } from "../features/posts/useGetPost";
import CommentSection from "../features/comments/CommentSection";

export default function PostPage() {
  const [recentPosts, setRecentPosts] = useState(null);
  const { post, isLoading } = useGetPost();

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch("/api/post/getposts?limit=3");
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecentPosts();
  }, []);

  if (isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col p-3">
      <h1 className="mx-auto mt-10 max-w-2xl p-3 text-center font-serif text-3xl lg:text-4xl">
        {post && post.title}
      </h1>
      <Link
        to={`/search?category${post?.category}`}
        className="mt-5 self-center"
      >
        <Button color="gray" pill size="xs">
          {post?.category}
        </Button>
      </Link>
      <img
        src={post?.image}
        alt={post?.image}
        className="mt-10 max-h-[600px] w-full object-cover p-3"
      />
      <div className="mx-auto flex w-full max-w-2xl justify-between border-b border-slate-500 p-3 text-xs">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span className="italic">
          {post && (post.content.length / 1000).toFixed(0) < 1
            ? "1"
            : (post.content.length / 1000).toFixed(0)}{" "}
          mins to read
        </span>
      </div>
      <div
        className="post-content mx-auto w-full max-w-2xl p-3"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post?.content) }}
      ></div>
      <div className="mx-auto w-full max-w-4xl">
        <CallToAction />
      </div>
      <CommentSection postId={post._id} />
      <div className="mb-5 flex flex-col items-center justify-center">
        <h1 className="mt-5 text-xl">Recent articles</h1>
        <div className="mt-5 flex flex-wrap justify-center gap-5">
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post?._id} post={post} />)}
        </div>
      </div>
    </main>
  );
}
