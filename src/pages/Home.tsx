import { useEffect, useState } from "react";
import TableUser from "../components/TableUser";
import axios from "axios";
import { User } from "../types/user";
import { Spinner } from "flowbite-react";

const Home = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/users");
      setUsers(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner aria-label="Default status example" />
      </div>
    );
  }

  if (!users.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-4xl font-bold">No Data</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-20">
      <TableUser users={users} />
    </div>
  );
};

export default Home;
