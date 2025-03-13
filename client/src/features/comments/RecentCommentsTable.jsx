import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";
/*eslint-disable */
const RecentCommentsTable = ({ comments, isLoading }) => {
  if (isLoading)
    return (
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Comment content</Table.HeadCell>
          <Table.HeadCell>Likes</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {[...Array(5)].map((_, index) => (
            <Table.Row key={index} className="bg-white dark:border-gray-700">
              <Table.Cell className="w-96">
                <div className="mb-1 h-4 w-full animate-pulse rounded bg-gray-300"></div>
                <div className="h-4 w-3/4 animate-pulse rounded bg-gray-300"></div>
              </Table.Cell>
              <Table.Cell>
                <div className="h-4 w-6 animate-pulse rounded bg-gray-300"></div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  return (
    <div className="flex w-full flex-col rounded-md p-2 shadow-md dark:bg-gray-800 md:w-auto">
      <div className="flex justify-between p-3 text-sm font-semibold">
        <h1 className="text-center">Recent comments</h1>
        <Button outline gradientDuoTone="purpleToPink">
          <Link to={"/dashboard?tab=comments"}>See all</Link>
        </Button>
      </div>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Comment content</Table.HeadCell>
          <Table.HeadCell>Likes</Table.HeadCell>
        </Table.Head>
        {comments &&
          comments.map((comment) => (
            <Table.Body key={comment._id} className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700">
                <Table.Cell className="w-96">
                  <p className="line-clamp-2">{comment.content}</p>
                </Table.Cell>
                <Table.Cell>{comment.numberOfLikes}</Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
      </Table>
    </div>
  );
};

export default RecentCommentsTable;
