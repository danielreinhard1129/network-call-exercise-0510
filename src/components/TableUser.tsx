import { Table } from "flowbite-react";
import { FC } from "react";
import { User } from "../types/user";

interface TableUserProps {
  users: User[];
}

const TableUser: FC<TableUserProps> = ({ users }) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Password</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {users.map((user, index) => (
            <TableRow
              key={index}
              name={user.name}
              email={user.email}
              password={user.password}
            />
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

const TableRow: FC<Omit<User, "id">> = (user) => {
  return (
    <Table.Row className="even:bg-green-200 odd:bg-white">
      <Table.Cell>{user.name}</Table.Cell>
      <Table.Cell>{user.email}</Table.Cell>
      <Table.Cell>{user.password}</Table.Cell>
    </Table.Row>
  );
};

export default TableUser;
