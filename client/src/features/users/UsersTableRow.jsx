import { Table } from "flowbite-react";
import { FaCheck, FaTimes } from "react-icons/fa";
/*eslint-disable */
const UsersTableRow = ({ user, setShowModal, setUserIdToDelete }) => {
  return (
    <Table.Body key={user._id} className="divide-y">
      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
        <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
        <Table.Cell>
          <img
            src={user.profilePicture}
            alt={user.username}
            className="h-10 w-10 rounded-full bg-gray-500 object-cover"
          />
        </Table.Cell>
        <Table.Cell>{user.username}</Table.Cell>
        <Table.Cell>{user.email}</Table.Cell>
        <Table.Cell>
          {user.isAdmin ? (
            <FaCheck className="text-green-500" />
          ) : (
            <FaTimes className="text-red-500" />
          )}
        </Table.Cell>
        <Table.Cell>
          <span
            onClick={() => {
              setShowModal(true);
              setUserIdToDelete(user._id);
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

export default UsersTableRow;
