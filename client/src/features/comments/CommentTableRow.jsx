import { Table } from "flowbite-react";

/*eslint-disable */
const CommentTableRow = ({ comment, setCommentIdToDelete, setShowModal }) => {
  return (
    <Table.Body key={comment?._id} className="divide-y">
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell>
          {new Date(comment?.createdAt).toLocaleDateString()}
        </Table.Cell>
        <Table.Cell>{comment?.content}</Table.Cell>
        <Table.Cell>{comment?.numberOfLikes}</Table.Cell>
        <Table.Cell>{comment?.postId}</Table.Cell>
        <Table.Cell>{comment?.userId}</Table.Cell>
        <Table.Cell>
          <span
            onClick={() => {
              setShowModal(true);
              setCommentIdToDelete(comment._id);
            }}
            className="cursor-pointer font-medium text-red-500 hover:underline"
          >
            Delete
          </span>
        </Table.Cell>
      </Table.Row>
    </Table.Body>
  );
};

export default CommentTableRow;
