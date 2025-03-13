import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";

/*eslint-disable */
const RecentPostsTable = ({ posts, isLoading }) => {
  if (isLoading)
    return (
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Post image</Table.HeadCell>
          <Table.HeadCell>Post title</Table.HeadCell>
          <Table.HeadCell>Post category</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {[...Array(5)].map((_, index) => (
            <Table.Row key={index} className="bg-white dark:border-gray-700">
              <Table.Cell>
                <div className="h-10 w-14 animate-pulse rounded-md bg-gray-300"></div>
              </Table.Cell>
              <Table.Cell>
                <div className="h-4 w-80 animate-pulse rounded bg-gray-300"></div>
              </Table.Cell>
              <Table.Cell>
                <div className="h-4 w-16 animate-pulse rounded bg-gray-300"></div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    );
  return (
    <div className="flex w-full flex-col rounded-md p-2 shadow-md dark:bg-gray-800 md:w-auto">
      <div className="flex justify-between p-3 text-sm font-semibold">
        <h1 className="text-center">Recent Posts</h1>
        <Button outline gradientDuoTone="purpleToPink">
          <Link to={"/dashboard?tab=users"}>See all</Link>
        </Button>
      </div>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell>Post image</Table.HeadCell>
          <Table.HeadCell className="min-w-80">Post title</Table.HeadCell>
          <Table.HeadCell>Post category</Table.HeadCell>
        </Table.Head>
        {posts &&
          posts.map((post) => (
            <Table.Body key={post._id} className="divide-y">
              <Table.Row className="bg-white dark:border-gray-700">
                <Table.Cell>
                  <img
                    src={post.image}
                    alt="post"
                    className="h-10 w-14 rounded-md bg-gray-500"
                  />
                </Table.Cell>
                <Table.Cell className="96">{post.title}</Table.Cell>
                <Table.Cell className="w-5">{post.category}</Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
      </Table>
    </div>
  );
};

export default RecentPostsTable;
