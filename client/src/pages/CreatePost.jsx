import CreatePostForm from "../features/posts/createPostForm";

const CreatePost = () => {
  return (
    <div className="mx-auto min-h-screen max-w-3xl p-3">
      <h1 className="my-7 text-center text-3xl font-semibold">
        Create a post{" "}
      </h1>
      <CreatePostForm />
    </div>
  );
};

export default CreatePost;
