import React, { useState } from 'react';
import RoleCard from '../components/RoleCard';
import { useNavigate } from 'react-router-dom';
import adminImage from '../assets/Admin.png';
import userImage from '../assets/User Avatar.png';

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole) {
      setLoading(true); 

      // Simulate an async action (e.g., API call or navigation delay)
      setTimeout(() => {
        navigate(`/login?role=${selectedRole}`);
        setLoading(false); 
      }, 1000); 
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-500 to-blue-900 flex flex-col justify-center items-center text-white overflow-hidden">
      <h1 className="text-2xl font-bold mb-12">Select your role to get started!</h1>
      <div className=" flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-16  " >
        <RoleCard
          title="Admin"
          image={adminImage}
          isSelected={selectedRole === 'Admin'}
          onClick={() => handleRoleSelect('Admin')}
        />
        <RoleCard
          title="User"
          image={userImage}
          isSelected={selectedRole === 'User'}
          onClick={() => handleRoleSelect('User')}
        />
      </div>
      <button
        onClick={handleContinue}
        className={`mt-8 px-6 py-3 rounded-full text-lg font-medium bg-[#021826] hover:bg-[#0A1C26] transition ${selectedRole ? '' : 'opacity-50 cursor-not-allowed'
          }`}
        disabled={!selectedRole}
      >
        {loading ? (
          <i className="fas fa-spinner fa-spin mx-2 white-icon"></i>
        ) : (
          <span>Continue →</span>
        )}
      </button>
    </div>
  );
};

export default RoleSelection;
