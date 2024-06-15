import React, { useEffect, useState } from "react";
import { getUserRoles } from "../services/UserService";
import { SlArrowDown } from "react-icons/sl";

interface UserRole {
  id: number;
  name: string;
  description: string;
}

interface UserRoleProps {
  isVisible: boolean;
  onToggle: () => void;
  onChangeUserRole: (role:{id:number,name:string})=>void
}

const UserRole: React.FC<UserRoleProps> = ({ isVisible, onToggle, onChangeUserRole }) => {
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  useEffect(() => {
    fetchUserRoles();
  }, []);

  const fetchUserRoles = async () => {
    try {
      const fetchedUserRoles = await getUserRoles();
      setUserRoles(fetchedUserRoles);
    } catch (err) {
      console.error("Failed to fetch user roles", err);
    }
  };
  return (
    <div className="relative">
      <button onClick={onToggle}>
        <SlArrowDown className="ml-2 cursor-pointer" />
      </button>
      {isVisible && (
        <ul className="absolute bg-white border border-gray-200 rounded shadow-lg w-64 z-10">
          {userRoles.map((role) => (
            <li
              key={role.id}
              className="flex items-center py-2 px-4 border-b border-gray-200"
              onClick={()=>onChangeUserRole(role)}
            >
              <div className="flex-1">
                <h3 className="font-bold">{role.name}</h3>
                <p className="text-gray-500 text-sm">{role.description}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserRole;
