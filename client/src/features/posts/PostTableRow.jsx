import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
/*eslint-disable */
const PostTableRow = ({ post, setShowModal, setPostIdToDelete }) => {
  return (
    <Table.Row
      key={post._id}
      className="bg-white dark:border-gray-700 dark:bg-gray-800"
    >
      <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()}</Table.Cell>
      <Table.Cell>
        <Link to={`/post/${post.slug}`}>
          <img
            src={post.image}
            alt={post.title}
            className="h-20 w-20 bg-gray-500 object-cover"
          />
        </Link>
      </Table.Cell>
      <Table.Cell>
        <Link
          className="font-medium text-gray-900 dark:text-white"
          to={`/post/${post.slug}`}
        >
          {post.title}
        </Link>
      </Table.Cell>
      <Table.Cell>{post.category}</Table.Cell>
      <Table.Cell>
        <span
          onClick={() => {
            setShowModal(true);
            setPostIdToDelete(post._id);
          }}
          className="cursor-pointer font-medium text-red-500 hover:underline"
        >
          Delete
        </span>
      </Table.Cell>
      <Table.Cell>
        <button
          onClick={() => {
            navigate(`/update-post/${post._id}`, {
              state: { post },
            });
          }}
          className="text-teal-500 hover:underline"
        >
          <span>Edit</span>
        </button>
      </Table.Cell>
    </Table.Row>
  );
};

export default PostTableRow;
