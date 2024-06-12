import React, { useState, useEffect } from "react";
import UserListComponent from "./UserListComponent";
import AddUserModal from "./AddUserModal";
import UserRole from "./UserRole";
import { getUsersByCultivation } from "./../services/UserService";

interface User {
  id: number;
  name: string;
  role: {
    name: string;
  };
}

const CultivationTeam: React.FC = () => {
  const [usersByCultivation, setUsersByCultivation] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(
    null
  );

  useEffect(() => {
    fetchUsersByCultivation();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const fetchUsersByCultivation = async () => {
    try {
      const fetchedUsersByCultivation = await getUsersByCultivation();
      setUsersByCultivation(fetchedUsersByCultivation);
    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleDropdownToggle = (index: number) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Cultivation role</th>
            <th className="px-4 py-2 text-left"></th>
          </tr>
        </thead>
        <tbody>
          {usersByCultivation.map((item, index) => (
            <tr key={item.id}>
              <td className="px-4 py-2 text-left">
                {item.user.name || "No name"}
              </td>
              <td className="px-4 py-2 text-left flex items-center relative">
                <span>{item.role.name}</span>
                <UserRole
                  isVisible={openDropdownIndex === index}
                  onToggle={() => handleDropdownToggle(index)}
                />
              </td>
              <td className="px-4 py-2 text-left">
                <button className="px-2 py-1 text-red-500 hover:text-red-700">
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={openModal}
      >
        Add team member
      </button>
      <AddUserModal isOpen={isModalOpen} onClose={closeModal}>
        <UserListComponent users={usersByCultivation} />
      </AddUserModal>
    </div>
  );
};

export default CultivationTeam;
