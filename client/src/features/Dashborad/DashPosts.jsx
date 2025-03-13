import { useState } from "react";
import { useSelector } from "react-redux";
import { Table } from "flowbite-react";

import TableLoadingSkeleton from "../../components/TableLoadingSkeleton";
import DeletionModal from "../../components/DeletionModal";
import PostTableRow from "../posts/PostTableRow";
import { useGetPosts } from "../posts/useGetPosts";
import { useDeletePost } from "../posts/useDeletePost";
const DashPosts = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { _id: userId } = currentUser;

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetPosts();

  const posts = data?.pages[0].posts;

  const { deletePost, isDeleting, setShowModal, showModal } = useDeletePost();
  const [postIdToDelete, setPostIdToDelete] = useState(null);

  if (isLoading || isDeleting)
    return (
      <TableLoadingSkeleton
        headers={[
          "Data updated",
          "Post image",
          "Post title",
          "Category",
          "Delete",
          "Edit",
        ]}
      />
    );

  return (
    <div className="dark: table-auto overflow-x-scroll p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 md:mx-auto">
      {currentUser.isAdmin && posts?.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {posts?.map((post) => (
                <PostTableRow
                  key={post._id}
                  post={post}
                  setPostIdToDelete={setPostIdToDelete}
                  setShowModal={setShowModal}
                />
              ))}
            </Table.Body>
          </Table>
          {hasNextPage && (
            <button
              onClick={fetchNextPage}
              className="w-full self-center py-7 text-sm text-teal-500"
              disabled={isFetchingNextPage}
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>You have no posts yet</p>
      )}
      <DeletionModal
        setShowModal={setShowModal}
        showModal={showModal}
        callback={() => deletePost({ postIdToDelete, userId })}
        modalHeader="Are you sure you want to delete this post"
      />
    </div>
  );
};
export default DashPosts;
