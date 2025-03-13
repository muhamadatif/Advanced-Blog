import { Table } from "flowbite-react";

/*eslint-disable */
const TableLoadingSkeleton = ({ headers }) => {
  return (
    <div className="p-3 md:mx-auto">
      <Table hoverable className="shadow-md">
        <Table.Head>
          {headers.map((header) => (
            <Table.HeadCell key={header}>{header}</Table.HeadCell>
          ))}
        </Table.Head>
        <Table.Body className="divide-y">
          {headers.map((_, index) => (
            <Table.Row
              key={index}
              className="animate-pulse bg-white dark:bg-gray-800"
            >
              <Table.Cell>
                <div className="h-4 w-24 rounded bg-gray-300"></div>
              </Table.Cell>
              <Table.Cell>
                <div className="h-20 w-20 rounded bg-gray-300"></div>
              </Table.Cell>
              <Table.Cell>
                <div className="h-4 w-40 rounded bg-gray-300"></div>
              </Table.Cell>
              <Table.Cell>
                <div className="h-4 w-24 rounded bg-gray-300"></div>
              </Table.Cell>
              <Table.Cell>
                <div className="h-4 w-16 rounded bg-gray-300"></div>
              </Table.Cell>
              <Table.Cell>
                <div className="h-4 w-16 rounded bg-gray-300"></div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default TableLoadingSkeleton;
