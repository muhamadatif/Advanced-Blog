import CreateUpdatePostForm from "../features/posts/CreateUpdatePostForm";

const CreatePost = () => {
  return (
    <div className="mx-auto min-h-screen max-w-3xl p-3">
      <h1 className="my-7 text-center text-3xl font-semibold">Create a post</h1>
      <CreateUpdatePostForm />
    </div>
  );
};

export default CreatePost;
