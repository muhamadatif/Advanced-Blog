import { Button, Table } from "flowbite-react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
/*eslint-disable */
const RecentUsersTable = ({ users, isLoading }) => {
  if (isLoading)
    return (
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>User image</Table.HeadCell>
          <Table.HeadCell>Username</Table.HeadCell>
          <Table.HeadCell>Admin</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {[...Array(1)].map((_, index) => (
            <Table.Row key={index} className="bg-white dark:border-gray-700">
              <Table.Cell>
                <div className="h-10 w-10 animate-pulse rounded-full bg-gray-300"></div>
              </Table.Cell>
              <Table.Cell>
                <div className="h-4 w-24 animate-pulse rounded bg-gray-300"></div>
              </Table.Cell>
              <Table.Cell>
                <div className="h-4 w-8 animate-pulse rounded bg-gray-300"></div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );

  return (
    <div className="flex w-full flex-col rounded-md p-2 shadow-md dark:bg-gray-800 md:w-auto">
      <div className="flex justify-between p-3 text-sm font-semibold">
        <h1 className="text-center">Recent users</h1>
        <Button outline gradientDuoTone="purpleToPink">
          <Link to={"/dashboard?tab=users"}>See all</Link>
        </Button>
      </div>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>User image</Table.HeadCell>
          <Table.HeadCell>Username</Table.HeadCell>
          <Table.HeadCell>Admin</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {users &&
            users.map((user) => (
              <Table.Row
                key={user._id}
                className="bg-white dark:border-gray-700"
              >
                <Table.Cell>
                  <img
                    src={user.profilePicture}
                    alt="user"
                    className="h-10 w-10 rounded-full bg-gray-500"
                  />
                </Table.Cell>
                <Table.Cell>{user.username}</Table.Cell>
                <Table.Cell>
                  {user.isAdmin ? (
                    <FaCheck className="text-green-500" />
                  ) : (
                    <FaTimes className="text-red-500" />
                  )}
                </Table.Cell>
              </Table.Row>
            ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default RecentUsersTable;
