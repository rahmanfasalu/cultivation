import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { getAllUsers } from "../services/UserService";

interface User {
  id: number;
  name: string;
}

// interface UserListComponentProps {
//   users: User[];
// }

const UserListComponent: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<Set<number>>(new Set());
  const [userColors, setUserColors] = useState<{ [userId: number]: string }>(
    {}
  );

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    const colors = allUsers.reduce((acc, user) => {
      acc[user.id] = randomColor();
      return acc;
    }, {} as { [userId: number]: string });
    setUserColors(colors);
  }, [allUsers]);

  const fetchAllUsers = async () => {
    try {
      const fetchedUsers = await getAllUsers();
      setAllUsers(fetchedUsers);
    } catch (err) {
      // setError("Failed to fetch users");
    } finally {
      // setLoading(false);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCheckboxChange = (userId: number) => {
    setSelectedUsers((prevSelectedUsers) => {
      const newSelectedUsers = new Set(prevSelectedUsers);
      if (newSelectedUsers.has(userId)) {
        newSelectedUsers.delete(userId);
      } else {
        newSelectedUsers.add(userId);
      }
      return newSelectedUsers;
    });
  };

  const handleAddUser = () => {
    const selectedUserList = allUsers.filter((user) =>
      selectedUsers.has(user.id)
    );
    console.log("Selected Users:", selectedUserList);
  };

  const randomColor = () => {
    const colors = [
      "#FEF1DC",
      "#E2EFE8",
      "#D9DACE",
      "#DFECFB",
      "#9ae6b4",
      "#68d391",
      "#fc8181",
      "#f6ad55",
      "#cbd5e0",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="p-4">
      <div className="relative">
        <input
          type="text"
          className="border rounded p-2 mb-4 w-full pr-8"
          placeholder="Search team member"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <FaSearch className="absolute top-3 right-3 text-gray-500" />
      </div>
      <ul className="max-h-60 overflow-y-auto p-0">
        {allUsers
          .filter((user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((user) => (
            <li key={user.id} className="flex items-center mb-2 border-b pb-2">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-blue-500 mr-2"
                checked={selectedUsers.has(user.id)}
                onChange={() => handleCheckboxChange(user.id)}
              />
              <div
                className="rounded-full h-8 w-8 ml-2 flex items-center justify-center"
                style={{ backgroundColor: userColors[user.id] }}
              >
                <span className="text-gray-800">{user.name[0]}</span>
              </div>
              <span className="text-gray-800 ml-4">{user.name}</span>
            </li>
          ))}
      </ul>
      <button
        className={`mt-4 p-2 rounded ${
          selectedUsers.size > 0
            ? "bg-blue-500 text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        disabled={selectedUsers.size === 0}
        onClick={handleAddUser}
      >
        Add to cultivation
      </button>
    </div>
  );
};

export default UserListComponent;
