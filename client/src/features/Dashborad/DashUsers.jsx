import { useState } from "react";
import { useSelector } from "react-redux";
import { Table } from "flowbite-react";

import TableLoadingSkeleton from "../../components/TableLoadingSkeleton";
import UsersTableRow from "../users/UsersTableRow";
import DeletionModal from "../../components/DeletionModal";
import { useGetUsers } from "../users/useGetUsers";
import { useDeleteUser } from "../users/useDeleteUser";
const DashUsers = () => {
  const [userIdToDelete, setUserIdToDelete] = useState("");
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchNextPageError } =
    useGetUsers();
  const { deleteUsers, isDeleting, showModal, setShowModal } = useDeleteUser();
  const { currentUser } = useSelector((state) => state.user);
  const users = data?.pages[0].users;

  if (isLoading || isDeleting)
    return (
      <TableLoadingSkeleton
        headers={[
          "Date created",
          "User image",
          "Username",
          "Email",
          "Admin",
          "Delete",
        ]}
      />
    );

  return (
    <div className="dark: table-auto overflow-x-scroll p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 md:mx-auto">
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <Table hoverable className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date created</Table.HeadCell>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Admin</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {users.map((user) => (
              <UsersTableRow
                key={user._id}
                user={user}
                setShowModal={setShowModal}
                setUserIdToDelete={setUserIdToDelete}
              />
            ))}
          </Table>
          {hasNextPage && (
            <button
              onClick={fetchNextPage}
              className="w-full self-center py-7 text-sm text-teal-500 disabled:cursor-not-allowed"
              disabled={isFetchNextPageError}
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <p>There are no users yet</p>
      )}

      <DeletionModal
        modalHeader={"Are you sure you want to delete this user"}
        showModal={showModal}
        setShowModal={setShowModal}
        callback={() => deleteUsers(userIdToDelete)}
      />
    </div>
  );
};

export default DashUsers;
