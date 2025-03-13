import { useState } from "react";
import { useSelector } from "react-redux";
import { Table } from "flowbite-react";
import CommentTableRow from "../comments/CommentTableRow";
import { useGetComments } from "../comments/useGetComments";
import TableLoadingSkeleton from "../../components/TableLoadingSkeleton";
import DeletionModal from "../../components/DeletionModal";
import { useDeleteComment } from "../comments/useDeleteComment";
const DashComments = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [commentIdToDelete, setCommentIdToDelete] = useState("");

  const { data, isLoading, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useGetComments();

  const { deleteComment, isDeleting, showModal, setShowModal } =
    useDeleteComment();

  const comments = data?.pages[0]?.comments;

  if (isLoading || isDeleting)
    return (
      <TableLoadingSkeleton
        headers={[
          "Data updated",
          "Comment content",
          "Number of likes",
          "Post Id",
          "User Id",
          "Delete",
        ]}
      />
    );

  return (
    <div className="dark: table-auto overflow-x-scroll p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 md:mx-auto">
      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date updated</Table.HeadCell>
              <Table.HeadCell>Comment content</Table.HeadCell>
              <Table.HeadCell>Number of likes</Table.HeadCell>
              <Table.HeadCell>PostId</Table.HeadCell>
              <Table.HeadCell>UserId</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {comments.map((comment) => (
              <CommentTableRow
                key={comment._id}
                comment={comment}
                setCommentIdToDelete={setCommentIdToDelete}
                setShowModal={setShowModal}
              />
            ))}
          </Table>
          {hasNextPage && (
            <button
              onClick={fetchNextPage}
              className="w-full self-center py-7 text-sm text-teal-500 disabled:cursor-not-allowed"
              disabled={isFetchingNextPage}
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>There are no comments yet</p>
      )}
      <DeletionModal
        setShowModal={setShowModal}
        showModal={showModal}
        modalHeader={"Are you sure you want to delete this comment"}
        callback={() => deleteComment(commentIdToDelete)}
      />
    </div>
  );
};

export default DashComments;
