import React from 'react'
import { useDispatch } from "react-redux";
import { logout } from '../store/reducers/authSlice';
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {

    dispatch(logout());
    navigate("/");
  };
  return (
    <>
      <div>AdminDashboard</div>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Logout
      </button>
    </>

  )
}
